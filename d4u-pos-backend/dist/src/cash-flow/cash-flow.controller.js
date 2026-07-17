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
exports.CashFlowController = void 0;
const common_1 = require("@nestjs/common");
const cash_flow_service_1 = require("./cash-flow.service");
let CashFlowController = class CashFlowController {
    service;
    constructor(service) {
        this.service = service;
    }
    getCashFlow(store_id, business_day_id) {
        return this.service.getCashFlowByDay(Number(store_id), business_day_id ? Number(business_day_id) : undefined);
    }
    getSummary(store_id) {
        return this.service.getCashSummary(Number(store_id));
    }
    cashIn(body) {
        console.log(`[POST] Cash In — Rs.${body.amount} — Store: ${body.store_id}`);
        return this.service.cashIn(body);
    }
    cashOut(body) {
        console.log(`[POST] Cash Out — Rs.${body.amount} — Store: ${body.store_id}`);
        return this.service.cashOut(body);
    }
};
exports.CashFlowController = CashFlowController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('business_day_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CashFlowController.prototype, "getCashFlow", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashFlowController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Post)('in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CashFlowController.prototype, "cashIn", null);
__decorate([
    (0, common_1.Post)('out'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CashFlowController.prototype, "cashOut", null);
exports.CashFlowController = CashFlowController = __decorate([
    (0, common_1.Controller)('cash-flow'),
    __metadata("design:paramtypes", [cash_flow_service_1.CashFlowService])
], CashFlowController);
//# sourceMappingURL=cash-flow.controller.js.map