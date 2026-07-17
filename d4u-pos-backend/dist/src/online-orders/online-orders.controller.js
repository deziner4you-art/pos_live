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
exports.OnlineOrdersController = void 0;
const common_1 = require("@nestjs/common");
const online_orders_service_1 = require("./online-orders.service");
let OnlineOrdersController = class OnlineOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    getOrders(phone, store_id) {
        if (phone) {
            return this.service.getOrdersByPhone(phone);
        }
        return this.service.getAllOnlineOrders(store_id ? Number(store_id) : undefined);
    }
    getOrder(id) {
        return this.service.getOrder(Number(id));
    }
    createOrder(body) {
        return this.service.createOrder(body);
    }
    updateOrderStatus(id, body) {
        return this.service.updateOrderStatus(Number(id), body);
    }
    postFeedback(id, body) {
        return this.service.postFeedback(Number(id), body.rating, body.comment);
    }
    acceptOnlineOrder(id) {
        return this.service.acceptOnlineOrder(Number(id));
    }
};
exports.OnlineOrdersController = OnlineOrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('phone')),
    __param(1, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Post)(':id/feedback'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "postFeedback", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnlineOrdersController.prototype, "acceptOnlineOrder", null);
exports.OnlineOrdersController = OnlineOrdersController = __decorate([
    (0, common_1.Controller)('online-orders'),
    __metadata("design:paramtypes", [online_orders_service_1.OnlineOrdersService])
], OnlineOrdersController);
//# sourceMappingURL=online-orders.controller.js.map