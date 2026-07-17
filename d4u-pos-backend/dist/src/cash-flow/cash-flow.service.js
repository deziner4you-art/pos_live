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
exports.CashFlowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CashFlowService = class CashFlowService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async cashIn(body) {
        const store_id = Number(body.store_id) || 1;
        const user_id = Number(body.user_id) || 1;
        const amount = parseFloat(body.amount) || 0;
        const openDay = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
            orderBy: { id: 'desc' },
        });
        if (!openDay)
            throw new common_1.NotFoundException('No open business day. Please start the day first.');
        const record = await this.prisma.cashFlow.create({
            data: {
                store_id,
                business_day_id: openDay.id,
                user_id,
                type: 'CASH_IN',
                amount,
                comment: body.comment ?? 'Opening Float',
            },
            include: { user: { select: { id: true, name: true } } },
        });
        console.log(`[CASH IN] Rs.${amount} — Store: ${store_id} — Day: ${openDay.id}`);
        return { success: true, record };
    }
    async cashOut(body) {
        const store_id = Number(body.store_id) || 1;
        const user_id = Number(body.user_id) || 1;
        const amount = parseFloat(body.amount) || 0;
        const openDay = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
            orderBy: { id: 'desc' },
        });
        if (!openDay)
            throw new common_1.NotFoundException('No open business day.');
        const record = await this.prisma.cashFlow.create({
            data: {
                store_id,
                business_day_id: openDay.id,
                user_id,
                type: 'CASH_OUT',
                amount,
                comment: body.comment ?? 'Cash withdrawal',
            },
            include: { user: { select: { id: true, name: true } } },
        });
        console.log(`[CASH OUT] Rs.${amount} — Store: ${store_id} — Day: ${openDay.id}`);
        return { success: true, record };
    }
    async getCashFlowByDay(store_id, business_day_id) {
        let dayId = business_day_id;
        if (!dayId) {
            const openDay = await this.prisma.businessDay.findFirst({
                where: { store_id, status: 'OPEN' },
                orderBy: { id: 'desc' },
            });
            dayId = openDay?.id;
        }
        if (!dayId)
            return [];
        return this.prisma.cashFlow.findMany({
            where: { store_id, business_day_id: dayId },
            include: { user: { select: { id: true, name: true } } },
            orderBy: { id: 'asc' },
        });
    }
    async getCashSummary(store_id) {
        const openDay = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
            orderBy: { id: 'desc' },
        });
        if (!openDay)
            return { cashIn: 0, cashOut: 0, netCash: 0 };
        const flows = await this.prisma.cashFlow.findMany({
            where: { store_id, business_day_id: openDay.id },
        });
        const cashIn = flows.filter((f) => f.type === 'CASH_IN').reduce((s, f) => s + f.amount, 0);
        const cashOut = flows.filter((f) => f.type === 'CASH_OUT').reduce((s, f) => s + f.amount, 0);
        return {
            business_day_id: openDay.id,
            cashIn,
            cashOut,
            netCash: cashIn - cashOut,
        };
    }
};
exports.CashFlowService = CashFlowService;
exports.CashFlowService = CashFlowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CashFlowService);
//# sourceMappingURL=cash-flow.service.js.map