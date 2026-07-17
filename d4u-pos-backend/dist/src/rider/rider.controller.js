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
exports.SettleOrderController = exports.DispatchOrderController = exports.RiderOrdersController = exports.RiderController = void 0;
const common_1 = require("@nestjs/common");
const rider_service_1 = require("./rider.service");
let RiderController = class RiderController {
    service;
    constructor(service) {
        this.service = service;
    }
    updateGps(body) {
        return this.service.updateRiderGps(body);
    }
    getRiderGps(orderId) {
        return this.service.getRiderGps(orderId);
    }
};
exports.RiderController = RiderController;
__decorate([
    (0, common_1.Post)('gps'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RiderController.prototype, "updateGps", null);
__decorate([
    (0, common_1.Get)('gps/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RiderController.prototype, "getRiderGps", null);
exports.RiderController = RiderController = __decorate([
    (0, common_1.Controller)('rider'),
    __metadata("design:paramtypes", [rider_service_1.RiderService])
], RiderController);
let RiderOrdersController = class RiderOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    getRiderOrders(storeId) {
        return this.service.getRiderOrders(storeId);
    }
};
exports.RiderOrdersController = RiderOrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RiderOrdersController.prototype, "getRiderOrders", null);
exports.RiderOrdersController = RiderOrdersController = __decorate([
    (0, common_1.Controller)('rider-orders'),
    __metadata("design:paramtypes", [rider_service_1.RiderService])
], RiderOrdersController);
let DispatchOrderController = class DispatchOrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    dispatchOrder(body) {
        return this.service.dispatchOrder(body);
    }
};
exports.DispatchOrderController = DispatchOrderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DispatchOrderController.prototype, "dispatchOrder", null);
exports.DispatchOrderController = DispatchOrderController = __decorate([
    (0, common_1.Controller)('dispatch-order'),
    __metadata("design:paramtypes", [rider_service_1.RiderService])
], DispatchOrderController);
let SettleOrderController = class SettleOrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    settleOrder(id) {
        return this.service.settleOrder(id);
    }
};
exports.SettleOrderController = SettleOrderController;
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettleOrderController.prototype, "settleOrder", null);
exports.SettleOrderController = SettleOrderController = __decorate([
    (0, common_1.Controller)('settle-order'),
    __metadata("design:paramtypes", [rider_service_1.RiderService])
], SettleOrderController);
//# sourceMappingURL=rider.controller.js.map