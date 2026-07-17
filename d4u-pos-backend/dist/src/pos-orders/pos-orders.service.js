"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_gateway_1 = require("../app.gateway");
const inventory_service_1 = require("../inventory/inventory.service");
const customers_service_1 = require("../customers/customers.service");
let PosOrdersService = class PosOrdersService {
    prisma;
    gateway;
    inventoryService;
    customersService;
    constructor(prisma, gateway, inventoryService, customersService) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.inventoryService = inventoryService;
        this.customersService = customersService;
    }
    async getOrders(store_id, business_day_id) {
        const where = { store_id };
        if (business_day_id)
            where.business_day_id = business_day_id;
        else {
            const openDay = await this.prisma.businessDay.findFirst({
                where: { store_id, status: 'OPEN' },
                orderBy: { id: 'desc' },
            });
            if (openDay)
                where.business_day_id = openDay.id;
        }
        return this.prisma.order.findMany({
            where,
            include: { items: { include: { product: true } }, customer: true },
            orderBy: { id: 'desc' },
        });
    }
    async getOrder(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } }, customer: true, kot: true },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        return order;
    }
    async createOrder(body) {
        const openDay = await this.prisma.businessDay.findFirst({
            where: { store_id: body.store_id, status: 'OPEN' },
            orderBy: { id: 'desc' },
        });
        const total_amount = body.items.reduce((sum, i) => sum + i.price * i.quantity, 0) -
            (body.discount || 0);
        const result = await this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    store_id: body.store_id,
                    business_day_id: openDay?.id ?? null,
                    customer_id: body.customer_id ?? null,
                    created_by: body.created_by,
                    business_date: new Date(),
                    total_amount,
                    discount: body.discount ?? 0,
                    status: 'PENDING',
                    order_source: body.order_source ?? 'WALKIN',
                    payment_method: body.payment_method ?? 'CASH',
                    payment_status: 'PAID',
                    table_no: body.table_no ?? null,
                    is_offline: body.is_offline ?? false,
                    delivery_address: body.delivery_address ?? null,
                    items: {
                        create: body.items.map((i) => ({
                            product_id: i.product_id,
                            quantity: i.quantity,
                            price: i.price,
                            special_inst: i.special_inst ?? null,
                        })),
                    },
                },
                include: { items: { include: { product: true } } },
            });
            const kotItems = order.items.map((i) => ({
                name: i.product.name,
                qty: i.quantity,
                price: i.price,
                specialInst: i.special_inst ?? '',
            }));
            await tx.kOT.create({
                data: {
                    store_id: body.store_id,
                    order_id: order.id,
                    business_day_id: openDay?.id ?? null,
                    items: kotItems,
                    status: 'NEW',
                },
            });
            if (body.customer_id) {
                await tx.customer.update({
                    where: { id: body.customer_id },
                    data: { total_orders: { increment: 1 } },
                });
            }
            return order;
        });
        console.log(`[NEW POS ORDER] #${result.id} | Total: Rs.${total_amount} | Store: ${body.store_id}`);
        this.gateway.broadcast('new_kot', {
            order_id: result.id,
            store_id: body.store_id,
            items: result.items,
        });
        this.inventoryService.deductForOrder(result.id).catch(err => console.error(`[PosOrders] Failed to deduct inventory for #${result.id}:`, err));
        if (body.customer_id) {
            this.customersService.earnPoints(body.customer_id, result.id, total_amount).catch(err => console.error(`[PosOrders] Failed to credit loyalty points for #${result.id}:`, err));
        }
        return { success: true, order: result };
    }
    async voidOrder(id, body) {
        const manager = await this.prisma.user.findUnique({
            where: { id: body.approved_by },
            include: { role: true },
        });
        if (!manager || manager.hashedPin !== body.manager_pin) {
            throw new common_1.ForbiddenException('Invalid manager PIN');
        }
        const order = await this.prisma.order.update({
            where: { id },
            data: {
                status: 'VOIDED',
                void_reason: body.void_reason,
                void_approved_by: body.approved_by,
            },
        });
        await this.prisma.kOT.updateMany({
            where: { order_id: id },
            data: { status: 'CANCELLED' },
        });
        console.log(`[VOID] Order #${id} — Reason: ${body.void_reason} — By Manager: ${manager.name}`);
        this.gateway.broadcast('order_voided', { order_id: id });
        return { success: true, order };
    }
    async settleOrder(id, body) {
        const order = await this.prisma.order.update({
            where: { id },
            data: {
                status: 'SETTLED',
                payment_method: body.payment_method,
                payment_status: 'PAID',
            },
        });
        console.log(`[SETTLED] POS Order #${id} | Method: ${body.payment_method}`);
        this.gateway.broadcast('order_settled', { order_id: id });
        return { success: true, order };
    }
    async getSalesSummary(store_id, business_day_id) {
        const openDay = business_day_id
            ? { id: business_day_id }
            : await this.prisma.businessDay.findFirst({
                where: { store_id, status: 'OPEN' },
                orderBy: { id: 'desc' },
            });
        if (!openDay)
            return { total: 0, orders: 0, voids: 0 };
        const orders = await this.prisma.order.findMany({
            where: { store_id, business_day_id: openDay.id, status: { not: 'VOIDED' } },
        });
        const voids = await this.prisma.order.count({
            where: { store_id, business_day_id: openDay.id, status: 'VOIDED' },
        });
        const total = orders.reduce((s, o) => s + o.total_amount, 0);
        return { total, orders: orders.length, voids, business_day_id: openDay.id };
    }
    async syncOfflineOrders(orders) {
        return this.prisma.$transaction(async (tx) => {
            let syncedCount = 0;
            for (const order of orders) {
                let items = [];
                try {
                    if (order.itemsData)
                        items = JSON.parse(order.itemsData);
                }
                catch (e) {
                    console.error('Failed to parse offline itemsData', e);
                }
                const newOrder = await tx.order.create({
                    data: {
                        store_id: 1,
                        business_day_id: 1,
                        business_date: new Date(),
                        customer_id: null,
                        order_source: 'OFFLINE_SYNC',
                        status: order.status === 'READY' ? 'DELIVERED' : 'PAID',
                        total_amount: order.totalAmount || 0,
                        payment_status: 'PAID',
                        payment_method: order.paymentMethod || 'CASH',
                        is_offline: true,
                        created_by: 1,
                        items: {
                            create: items.map((i) => ({
                                product_id: i.id || 1,
                                quantity: i.qty || 1,
                                price: i.price || 0,
                            }))
                        }
                    }
                });
                syncedCount++;
            }
            return { success: true, syncedCount };
        });
    }
};
exports.PosOrdersService = PosOrdersService;
exports.PosOrdersService = PosOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway,
        inventory_service_1.InventoryService,
        customers_service_1.CustomersService])
], PosOrdersService);
//# sourceMappingURL=pos-orders.service.js.map