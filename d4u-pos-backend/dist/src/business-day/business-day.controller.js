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
exports.BusinessDayController = void 0;
const common_1 = require("@nestjs/common");
const business_day_service_1 = require("./business-day.service");
let BusinessDayController = class BusinessDayController {
    service;
    constructor(service) {
        this.service = service;
    }
    getCurrentDay(store_id) {
        if (!store_id)
            return { error: 'store_id is required' };
        console.log(`[GET] Current Business Day — Store: ${store_id}`);
        return this.service.getCurrentDay(Number(store_id));
    }
    getDayHistory(store_id, limit) {
        return this.service.getDayHistory(Number(store_id), limit ? Number(limit) : 30);
    }
    startDay(body) {
        console.log(`[DAY START] Store: ${body.store_id} — Opening Float: Rs.${body.openingFloat}`);
        return this.service.startDay(body.store_id, body.started_by, body.openingFloat);
    }
    closeDay(body) {
        console.log(`[DAY CLOSE] Store: ${body.store_id} — Closing Cash: Rs.${body.closingCash}`);
        return this.service.closeDay(body.store_id, body.closed_by, body.closingCash, body.notes);
    }
};
exports.BusinessDayController = BusinessDayController;
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusinessDayController.prototype, "getCurrentDay", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BusinessDayController.prototype, "getDayHistory", null);
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessDayController.prototype, "startDay", null);
__decorate([
    (0, common_1.Post)('close'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessDayController.prototype, "closeDay", null);
exports.BusinessDayController = BusinessDayController = __decorate([
    (0, common_1.Controller)('business-day'),
    __metadata("design:paramtypes", [business_day_service_1.BusinessDayService])
], BusinessDayController);
//# sourceMappingURL=business-day.controller.js.map