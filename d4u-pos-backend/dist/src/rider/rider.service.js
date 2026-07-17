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
exports.RiderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_gateway_1 = require("../app.gateway");
let RiderService = class RiderService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async getRiderOrders(storeId) {
        const whereClause = {
            status: {
                in: ['DISPATCHED', 'RIDER_ACCEPTED', 'PICKED_UP', 'PAID'],
            },
        };
        if (storeId) {
            whereClause.store_id = Number(storeId);
        }
        return this.prisma.onlineOrder.findMany({
            where: whereClause,
            orderBy: { id: 'desc' },
        });
    }
    async updateRiderGps(body) {
        const orderId = Number(body.orderId);
        const lat = Number(body.lat);
        const lng = Number(body.lng);
        const deliveryInfo = {
            riderId: body.riderId || 'R1',
            lat,
            lng,
            lastUpdated: new Date().toISOString(),
        };
        try {
            await this.prisma.onlineOrder.update({
                where: { id: orderId },
                data: { delivery: deliveryInfo },
            });
            console.log(`[GPS UPDATE] Order #${orderId} -> lat: ${lat}, lng: ${lng}`);
        }
        catch (error) {
            console.log(`[GPS UPDATE - FALLBACK] Delivery #${orderId} -> lat: ${lat}, lng: ${lng}`);
        }
        this.gateway.broadcast('gps_update', { orderId, lat, lng });
        return { success: true };
    }
    async getRiderGps(orderId) {
        const order = await this.prisma.onlineOrder.findUnique({
            where: { id: Number(orderId) },
        });
        if (order && order.delivery) {
            return order.delivery;
        }
        throw new common_1.NotFoundException('Location not found');
    }
    async dispatchOrder(body) {
        const bridgeId = Number(body.bridgeOrderId);
        let order = null;
        try {
            order = await this.prisma.onlineOrder.findUnique({
                where: { id: bridgeId },
            });
        }
        catch (e) { }
        if (!order && body.order) {
            try {
                order = await this.prisma.onlineOrder.create({
                    data: {
                        id: bridgeId,
                        orderId: Number(body.order.id),
                        status: 'DISPATCHED',
                        kdsStatus: 'DISPATCHED',
                        type: 'Delivery',
                        source: 'POS',
                        customer: body.order.customer || 'Guest',
                        customerAddress: body.order.address || 'Address',
                        items: body.order.items ? body.order.items.map((i) => `${i.qty}x ${i.name}`).join(', ') : '',
                        totalAmount: String(body.order.cod || 0),
                        riderAssigned: true,
                        timePlaced: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    },
                });
            }
            catch (err) {
                console.error('[DISPATCH CREATE ERROR]', err);
            }
        }
        else if (order) {
            order = await this.prisma.onlineOrder.update({
                where: { id: bridgeId },
                data: {
                    status: 'DISPATCHED',
                    kdsStatus: 'DISPATCHED',
                    riderAssigned: true,
                },
            });
        }
        if (order) {
            console.log(`[DISPATCHED] Order #${order.id} sent to Rider`);
            this.gateway.broadcast('order_updated', order);
            return { success: true, order };
        }
        else {
            throw new common_1.NotFoundException('Order not found in bridge');
        }
    }
    async settleOrder(id) {
        try {
            const updated = await this.prisma.onlineOrder.update({
                where: { id: Number(id) },
                data: { status: 'SETTLED', kdsStatus: 'SETTLED' },
            });
            console.log(`[SETTLED] Order #${id} cash collected by POS`);
            this.gateway.broadcast('order_updated', updated);
            return { success: true, order: updated };
        }
        catch (error) {
            throw new common_1.NotFoundException('Order not found');
        }
    }
};
exports.RiderService = RiderService;
exports.RiderService = RiderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], RiderService);
//# sourceMappingURL=rider.service.js.map