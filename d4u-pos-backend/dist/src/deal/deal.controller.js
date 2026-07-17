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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealController = void 0;
const common_1 = require("@nestjs/common");
const deal_service_1 = require("./deal.service");
let DealController = class DealController {
    dealService;
    constructor(dealService) {
        this.dealService = dealService;
    }
    async calculateDeal(body) {
        return this.dealService.calculateDealDiscount(body.product_id, body.quantity, body.requested_discount_pct);
    }
};
exports.DealController = DealController;
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "calculateDeal", null);
exports.DealController = DealController = __decorate([
    (0, common_1.Controller)('deal'),
    __metadata("design:paramtypes", [deal_service_1.DealService])
], DealController);
//# sourceMappingURL=deal.controller.js.map