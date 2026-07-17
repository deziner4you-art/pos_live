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
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DealService = class DealService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    SAFETY_THRESHOLD_PCT = 10.0;
    async calculateDealDiscount(product_id, quantity, requested_discount_pct) {
        const product = await this.prisma.product.findUnique({
            where: { id: product_id }
        });
        if (!product)
            throw new common_1.BadRequestException('Product not found');
        const profitMarginPct = ((product.price - product.cost) / product.price) * 100;
        const resultingMargin = profitMarginPct - requested_discount_pct;
        if (resultingMargin < this.SAFETY_THRESHOLD_PCT) {
            return {
                allowed: false,
                reason: 'MARGIN_PROTECTION_TRIGGERED',
                message: `Deal auto-suspended. Margin drops to ${resultingMargin.toFixed(2)}%, below safety threshold of ${this.SAFETY_THRESHOLD_PCT}%.`
            };
        }
        return {
            allowed: true,
            original_price: product.price * quantity,
            discounted_price: (product.price * quantity) * (1 - (requested_discount_pct / 100)),
            final_margin_pct: resultingMargin
        };
    }
};
exports.DealService = DealService;
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealService);
//# sourceMappingURL=deal.service.js.map