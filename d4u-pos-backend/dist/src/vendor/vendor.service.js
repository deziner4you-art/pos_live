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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VendorService = class VendorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVendors(store_id) {
        return this.prisma.vendor.findMany({ where: { store_id } });
    }
    async createPO(body) {
        const total_amount = body.items.reduce((sum, item) => sum + (item.ordered_qty * item.price_unit), 0);
        return this.prisma.purchaseOrder.create({
            data: {
                store_id: body.store_id,
                vendor_id: body.vendor_id,
                total_amount,
                items: {
                    create: body.items.map(i => ({
                        inventory_id: i.inventory_id,
                        ordered_qty: i.ordered_qty,
                        price_unit: i.price_unit
                    }))
                }
            },
            include: { items: true }
        });
    }
    async receivePO(poId, body) {
        return this.prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.findUnique({
                where: { id: poId },
                include: { items: true }
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase Order not found');
            let totalLossAmount = 0;
            for (const rx of body.received_items) {
                const item = po.items.find(i => i.id === rx.po_item_id);
                if (!item)
                    continue;
                await tx.purchaseOrderItem.update({
                    where: { id: item.id },
                    data: { received_qty: rx.received_qty }
                });
                await tx.inventoryItem.update({
                    where: { id: item.inventory_id },
                    data: { quantity: { increment: rx.received_qty } }
                });
                if (item.ordered_qty > rx.received_qty) {
                    const lostQty = item.ordered_qty - rx.received_qty;
                    await tx.transitLoss.create({
                        data: {
                            po_item_id: item.id,
                            inventory_id: item.inventory_id,
                            lost_qty: lostQty,
                            reason: 'System Auto Transit Loss'
                        }
                    });
                }
            }
            const updatedPO = await tx.purchaseOrder.update({
                where: { id: poId },
                data: {
                    status: 'DELIVERED',
                    payment_status: body.payment_status,
                    deliveredAt: new Date()
                }
            });
            if (body.payment_status === 'UNPAID') {
                await tx.vendor.update({
                    where: { id: po.vendor_id },
                    data: { ledger_balance: { decrement: po.total_amount } }
                });
            }
            return updatedPO;
        });
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map