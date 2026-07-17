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
exports.OnlineOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_gateway_1 = require("../app.gateway");
let OnlineOrdersService = class OnlineOrdersService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async createOrder(body) {
        const storeId = body.store_id ? Number(body.store_id) : 1;
        const order = await this.prisma.onlineOrder.create({
            data: {
                store_id: storeId,
                customer: body.customer || 'Online Guest',
                customerPhone: body.customerPhone || '',
                customerAddress: body.customerAddress || 'No Address Provided',
                items: typeof body.items === 'string' ? body.items : JSON.stringify(body.items),
                totalAmount: String(body.totalAmount || '0.00'),
                source: body.source || 'Website',
                notes: body.notes || '',
                status: 'PENDING',
                kdsStatus: 'PENDING',
                type: 'Online',
                timePlaced: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            },
        });
        const updatedOrder = await this.prisma.onlineOrder.update({
            where: { id: order.id },
            data: { orderId: order.id },
        });
        console.log(`[NEW ORDER] #${updatedOrder.id} — Store: ${storeId} — ${updatedOrder.items}`);
        this.gateway.broadcast('new_order', updatedOrder, `store_${storeId}`);
        if (body.customerPhone) {
            const existingCustomer = await this.prisma.customer.findUnique({
                where: { phone: body.customerPhone }
            });
            if (existingCustomer) {
                const pointsEarned = Math.floor(parseFloat(body.totalAmount || '0'));
                if (pointsEarned > 0) {
                    await this.prisma.customer.update({
                        where: { id: existingCustomer.id },
                        data: {
                            loyalty_points: { increment: pointsEarned },
                            total_orders: { increment: 1 }
                        }
                    });
                    console.log(`[LOYALTY] Awarded ${pointsEarned} points to ${existingCustomer.name}`);
                }
            }
        }
        return { success: true, order: updatedOrder };
    }
    async getOrdersByPhone(phone) {
        return this.prisma.onlineOrder.findMany({
            where: { customerPhone: phone },
            orderBy: { id: 'desc' },
        });
    }
    async getAllOnlineOrders(store_id) {
        const whereClause = { status: 'PENDING' };
        if (store_id) {
            whereClause.store_id = store_id;
        }
        return this.prisma.onlineOrder.findMany({
            where: whereClause,
            orderBy: { id: 'desc' },
        });
    }
    async getOrder(id) {
        const order = await this.prisma.onlineOrder.findUnique({
            where: { id },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(id, data) {
        const allowedKeys = [
            'orderId', 'status', 'kdsStatus', 'type', 'source', 'customer',
            'customerPhone', 'customerAddress', 'items', 'totalAmount', 'notes',
            'prepTimeMinutes', 'estimatedReadyAt', 'timePlaced', 'riderAssigned',
            'feedback', 'delivery',
        ];
        const updateData = {};
        for (const key of allowedKeys) {
            if (data[key] !== undefined) {
                updateData[key] = data[key];
            }
        }
        try {
            const existingOrder = await this.prisma.onlineOrder.findUnique({ where: { id } });
            if (!existingOrder)
                throw new common_1.NotFoundException('Order not found');
            const updated = await this.prisma.onlineOrder.update({
                where: { id },
                data: updateData,
            });
            if ((data.status === 'SETTLED' || data.status === 'PAID') &&
                existingOrder.status !== 'SETTLED' &&
                existingOrder.status !== 'PAID') {
                try {
                    const itemsArr = JSON.parse(updated.items);
                    for (const item of itemsArr) {
                        const product = await this.prisma.product.findFirst({
                            where: { store_id: updated.store_id, name: item.name },
                            include: { recipeItems: true }
                        });
                        if (product && product.recipeItems.length > 0) {
                            for (const recipe of product.recipeItems) {
                                const qtyToDeduct = recipe.quantity * (item.qty || 1);
                                await this.prisma.inventoryItem.update({
                                    where: { id: recipe.inventory_id },
                                    data: { quantity: { decrement: qtyToDeduct } }
                                });
                                await this.prisma.inventoryTransactionLog.create({
                                    data: {
                                        inventory_id: recipe.inventory_id,
                                        operation: 'SUBTRACT',
                                        amount: qtyToDeduct,
                                        reason: `Order #${updated.id} settled`,
                                        changed_by: 0
                                    }
                                });
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(`[STOCK DEDUCTION ERROR] Order #${id}:`, e);
                }
                try {
                    let targetDay = await this.prisma.businessDay.findFirst({
                        where: {
                            store_id: updated.store_id,
                            dayStart: { lte: updated.createdAt },
                            OR: [
                                { dayClose: null },
                                { dayClose: { gte: updated.createdAt } }
                            ]
                        }
                    });
                    if (!targetDay) {
                        targetDay = await this.prisma.businessDay.findFirst({
                            where: { store_id: updated.store_id, dayStart: { lte: updated.createdAt } },
                            orderBy: { id: 'desc' }
                        });
                    }
                    if (!targetDay) {
                        targetDay = await this.prisma.businessDay.findFirst({
                            where: { store_id: updated.store_id },
                            orderBy: { id: 'desc' }
                        });
                    }
                    if (targetDay) {
                        let total_amount = parseFloat(updated.totalAmount || '0');
                        if (isNaN(total_amount))
                            total_amount = 0;
                        let itemsArr = [];
                        try {
                            itemsArr = JSON.parse(updated.items || '[]');
                        }
                        catch (e) { }
                        await this.prisma.order.create({
                            data: {
                                store_id: updated.store_id,
                                business_day_id: targetDay.id,
                                created_by: 1,
                                business_date: targetDay.dayStart,
                                total_amount: total_amount,
                                discount: 0,
                                status: 'COMPLETED',
                                order_source: 'ONLINE',
                                payment_method: 'CASH',
                                payment_status: 'PAID',
                                delivery_address: updated.customerAddress,
                                items: {
                                    create: itemsArr.map((i) => ({
                                        product_id: parseInt(i.id) || 0,
                                        quantity: i.qty || 1,
                                        price: parseFloat(i.price) || 0,
                                        special_inst: i.special_inst || ''
                                    }))
                                }
                            }
                        });
                        if (targetDay.status === 'CLOSED') {
                            await this.prisma.businessDay.update({
                                where: { id: targetDay.id },
                                data: {
                                    totalSales: { increment: total_amount },
                                    closingCash: { increment: total_amount },
                                    totalOrders: { increment: 1 }
                                }
                            });
                            console.log(`[RETROACTIVE SALES] Added ${total_amount} to Closed Day #${targetDay.id}`);
                        }
                        else {
                            console.log(`[SALES] Added ${total_amount} to Open Day #${targetDay.id}`);
                        }
                    }
                }
                catch (e) {
                    console.error(`[POS ORDER CREATION ERROR] Order #${id}:`, e);
                }
            }
            console.log(`[STATUS UPDATE] Order #${id} → kdsStatus: ${updated.kdsStatus}`);
            this.gateway.broadcast('order_updated', updated, `store_${updated.store_id}`);
            return { success: true, order: updated };
        }
        catch (error) {
            throw new common_1.NotFoundException('Order not found or update failed');
        }
    }
    async postFeedback(id, rating, comment) {
        try {
            const updated = await this.prisma.onlineOrder.update({
                where: { id },
                data: {
                    feedback: {
                        rating: rating || 5,
                        comment: comment || '',
                        timestamp: new Date().toISOString(),
                    },
                },
            });
            console.log(`[FEEDBACK] Order #${id} — Rating: ${rating}`);
            return { success: true, order: updated };
        }
        catch (error) {
            throw new common_1.NotFoundException('Order not found');
        }
    }
    async acceptOnlineOrder(id) {
        try {
            const updated = await this.prisma.onlineOrder.update({
                where: { id },
                data: { status: 'ACCEPTED', kdsStatus: 'ACCEPTED' },
            });
            console.log(`[ACCEPTED] Order #${id}`);
            this.gateway.broadcast('order_updated', updated, `store_${updated.store_id}`);
            return { success: true };
        }
        catch (error) {
            throw new common_1.NotFoundException('Order not found');
        }
    }
};
exports.OnlineOrdersService = OnlineOrdersService;
exports.OnlineOrdersService = OnlineOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], OnlineOrdersService);
//# sourceMappingURL=online-orders.service.js.map