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
exports.PosOrdersController = void 0;
const common_1 = require("@nestjs/common");
const pos_orders_service_1 = require("./pos-orders.service");
let PosOrdersController = class PosOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    getOrders(store_id, business_day_id) {
        console.log(`[GET] POS Orders — Store: ${store_id}`);
        return this.service.getOrders(Number(store_id), business_day_id ? Number(business_day_id) : undefined);
    }
    getSummary(store_id, business_day_id) {
        console.log(`[GET] Sales Summary — Store: ${store_id}`);
        return this.service.getSalesSummary(Number(store_id), business_day_id ? Number(business_day_id) : undefined);
    }
    getOrder(id) {
        console.log(`[GET] Order #${id}`);
        return this.service.getOrder(Number(id));
    }
    createOrder(body) {
        console.log(`[POST] New POS Order — Store: ${body.store_id} | Items: ${body.items?.length}`);
        return this.service.createOrder(body);
    }
    voidOrder(id, body) {
        console.log(`[VOID] Order #${id} — Reason: ${body.void_reason}`);
        return this.service.voidOrder(Number(id), body);
    }
    settleOrder(id, body) {
        console.log(`[SETTLE] Order #${id} — Method: ${body.payment_method}`);
        return this.service.settleOrder(Number(id), body);
    }
    syncOffline(body) {
        console.log(`[SYNC-OFFLINE] Received ${body.orders?.length} offline orders`);
        return this.service.syncOfflineOrders(body.orders || []);
    }
};
exports.PosOrdersController = PosOrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('business_day_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('business_day_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Patch)(':id/void'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "voidOrder", null);
__decorate([
    (0, common_1.Patch)(':id/settle'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "settleOrder", null);
__decorate([
    (0, common_1.Post)('sync-offline'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosOrdersController.prototype, "syncOffline", null);
exports.PosOrdersController = PosOrdersController = __decorate([
    (0, common_1.Controller)('pos-orders'),
    __metadata("design:paramtypes", [pos_orders_service_1.PosOrdersService])
], PosOrdersController);
//# sourceMappingURL=pos-orders.controller.js.map