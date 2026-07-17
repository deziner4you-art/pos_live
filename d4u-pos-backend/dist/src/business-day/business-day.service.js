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
exports.BusinessDayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BusinessDayService = class BusinessDayService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentDay(store_id) {
        const day = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
            include: {
                starter: { select: { id: true, name: true, role: true } },
            },
            orderBy: { id: 'desc' },
        });
        return day;
    }
    async startDay(store_id, started_by, openingFloat) {
        const existing = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Day already open! Previous Day ID: ${existing.id}. Please close it first.`);
        }
        const day = await this.prisma.businessDay.create({
            data: {
                store_id,
                started_by,
                dayStart: new Date(),
                openingFloat,
                status: 'OPEN',
            },
            include: {
                starter: { select: { id: true, name: true } },
            },
        });
        console.log(`[DAY START] Store ${store_id} — Day #${day.id} — Float: Rs.${openingFloat} — By: ${day.starter.name}`);
        return { success: true, day };
    }
    async closeDay(store_id, closed_by, closingCash, notes) {
        const openDay = await this.prisma.businessDay.findFirst({
            where: { store_id, status: 'OPEN' },
            orderBy: { id: 'desc' },
        });
        if (!openDay)
            throw new common_1.NotFoundException('No open business day found');
        const orders = await this.prisma.order.findMany({
            where: { store_id, business_day_id: openDay.id, status: { not: 'VOIDED' } },
        });
        const totalSales = orders.reduce((s, o) => s + o.total_amount, 0);
        const totalOrders = orders.length;
        const expectedCash = (openDay.openingFloat || 0) + totalSales;
        const discrepancy = closingCash - expectedCash;
        const day = await this.prisma.businessDay.update({
            where: { id: openDay.id },
            data: {
                closed_by,
                dayClose: new Date(),
                closingCash,
                totalSales,
                totalOrders,
                status: 'CLOSED',
                notes: notes ?? (discrepancy !== 0 ? `Cash discrepancy: Rs.${discrepancy.toFixed(2)}` : null),
            },
        });
        console.log(`[DAY CLOSE] Store ${store_id} — Day #${day.id} — Sales: Rs.${totalSales} — Cash: Rs.${closingCash} — Diff: Rs.${discrepancy}`);
        return {
            success: true,
            day,
            summary: { totalSales, totalOrders, expectedCash, closingCash, discrepancy },
        };
    }
    async getDayHistory(store_id, limit = 30) {
        return this.prisma.businessDay.findMany({
            where: { store_id },
            include: {
                starter: { select: { id: true, name: true } },
                closer: { select: { id: true, name: true } },
            },
            orderBy: { id: 'desc' },
            take: limit,
        });
    }
};
exports.BusinessDayService = BusinessDayService;
exports.BusinessDayService = BusinessDayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessDayService);
//# sourceMappingURL=business-day.service.js.map