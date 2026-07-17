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
exports.KotsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_gateway_1 = require("../app.gateway");
let KotsService = class KotsService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async getActiveKots(store_id) {
        const where = { status: { in: ['NEW', 'PREPARING'] } };
        if (store_id && !isNaN(store_id)) {
            where.store_id = store_id;
        }
        return this.prisma.kOT.findMany({
            where,
            include: { order: true },
            orderBy: { id: 'asc' },
        });
    }
    async getKot(id) {
        const kot = await this.prisma.kOT.findUnique({
            where: { id },
            include: { order: { include: { items: { include: { product: true } } } } },
        });
        if (!kot)
            throw new common_1.NotFoundException(`KOT #${id} not found`);
        return kot;
    }
    async updateKotStatus(id, status) {
        const now = new Date();
        const data = { status };
        if (status === 'PREPARING')
            data.acceptedAt = now;
        if (status === 'READY')
            data.readyAt = now;
        const kot = await this.prisma.kOT.update({
            where: { id },
            data,
            include: { order: true },
        });
        if (status === 'READY') {
            await this.prisma.order.update({
                where: { id: kot.order_id },
                data: { status: 'READY' },
            });
        }
        else if (status === 'PREPARING') {
            await this.prisma.order.update({
                where: { id: kot.order_id },
                data: { status: 'PREPARING' },
            });
        }
        console.log(`[KDS] KOT #${id} → ${status}`);
        this.gateway.broadcast('kds_update', {
            kot_id: id,
            order_id: kot.order_id,
            status,
            store_id: kot.store_id,
        });
        return { success: true, kot };
    }
    async incrementPrintCount(id) {
        const kot = await this.prisma.kOT.update({
            where: { id },
            data: { printCount: { increment: 1 } },
        });
        console.log(`[PRINT] KOT #${id} — Print #${kot.printCount}`);
        return { success: true, printCount: kot.printCount };
    }
    async getKotsByDay(store_id, business_day_id) {
        return this.prisma.kOT.findMany({
            where: { store_id, business_day_id },
            include: { order: true },
            orderBy: { id: 'desc' },
        });
    }
};
exports.KotsService = KotsService;
exports.KotsService = KotsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], KotsService);
//# sourceMappingURL=kots.service.js.map