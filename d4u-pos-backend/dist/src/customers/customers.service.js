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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCustomers(brand_id, search) {
        const where = { brand_id };
        if (search) {
            where.OR = [
                { phone: { contains: search } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.customer.findMany({
            where,
            orderBy: { total_orders: 'desc' },
        });
    }
    async findByPhone(phone) {
        const customer = await this.prisma.customer.findUnique({ where: { phone } });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async getCustomerOrders(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                orders: {
                    include: { items: { include: { product: true } } },
                    orderBy: { id: 'desc' },
                    take: 50,
                },
            },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async createCustomer(body) {
        const existing = await this.prisma.customer.findUnique({
            where: { phone: body.phone },
        });
        if (existing)
            throw new common_1.ConflictException(`Customer with phone ${body.phone} already exists`);
        const customer = await this.prisma.customer.create({
            data: {
                brand_id: body.brand_id,
                phone: body.phone,
                name: body.name,
                address: body.address ?? null,
            },
        });
        console.log(`[NEW CUSTOMER] ${customer.name} — ${customer.phone}`);
        return { success: true, customer };
    }
    async updateCustomer(id, body) {
        const customer = await this.prisma.customer.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.address && { address: body.address }),
            },
        });
        return { success: true, customer };
    }
    async earnPoints(customer_id, order_id, order_amount) {
        const points = Math.floor(order_amount / 100) * 5;
        if (points <= 0)
            return { points: 0 };
        await this.prisma.$transaction([
            this.prisma.loyaltyTransaction.create({
                data: { customer_id, order_id, type: 'EARN', points, description: `Order #${order_id}` },
            }),
            this.prisma.customer.update({
                where: { id: customer_id },
                data: { loyalty_points: { increment: points } },
            }),
        ]);
        console.log(`[LOYALTY] Customer #${customer_id} earned ${points} points`);
        return { success: true, points };
    }
    async redeemPoints(customer_id, points) {
        const customer = await this.prisma.customer.findUnique({ where: { id: customer_id } });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        if (customer.loyalty_points < points) {
            throw new common_1.ConflictException(`Insufficient points. Available: ${customer.loyalty_points}`);
        }
        await this.prisma.$transaction([
            this.prisma.loyaltyTransaction.create({
                data: { customer_id, type: 'REDEEM', points: -points, description: 'Points redeemed at POS' },
            }),
            this.prisma.customer.update({
                where: { id: customer_id },
                data: { loyalty_points: { decrement: points } },
            }),
        ]);
        const discount = points * 0.2;
        console.log(`[LOYALTY REDEEM] Customer #${customer_id} used ${points} points = Rs.${discount}`);
        return { success: true, points_used: points, discount_amount: discount };
    }
    async getWalletBalance(customer_id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customer_id },
            select: { id: true, name: true, phone: true, loyalty_points: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const transactions = await this.prisma.loyaltyTransaction.findMany({
            where: { customer_id },
            orderBy: { id: 'desc' },
            take: 20,
        });
        return { ...customer, transactions };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map