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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./reports.service");
let ReportsController = class ReportsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getDailyReport(store_id, date) {
        return this.service.getDailyReport(Number(store_id), date);
    }
    getBranchAnalytics(store_id, start_date, end_date, business_day_id, cashier_id) {
        return this.service.getBranchAnalytics(Number(store_id), start_date, end_date, business_day_id ? Number(business_day_id) : undefined, cashier_id ? Number(cashier_id) : undefined);
    }
    getShifts(store_id, limit) {
        return this.service.getShifts(Number(store_id), limit ? Number(limit) : 10);
    }
    getWeeklyTrend(store_id) {
        return this.service.getWeeklyTrend(Number(store_id));
    }
    getTopProducts(store_id, limit) {
        return this.service.getTopProducts(Number(store_id), limit ? Number(limit) : 10);
    }
    getVoids(store_id, business_day_id) {
        return this.service.getVoidedOrders(Number(store_id), business_day_id ? Number(business_day_id) : undefined);
    }
    getBrandOverview(brand_id) {
        return this.service.getBrandOverview(Number(brand_id));
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('daily'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getDailyReport", null);
__decorate([
    (0, common_1.Get)('branch-analytics'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('start_date')),
    __param(2, (0, common_1.Query)('end_date')),
    __param(3, (0, common_1.Query)('business_day_id')),
    __param(4, (0, common_1.Query)('cashier_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getBranchAnalytics", null);
__decorate([
    (0, common_1.Get)('shifts'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getShifts", null);
__decorate([
    (0, common_1.Get)('weekly'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getWeeklyTrend", null);
__decorate([
    (0, common_1.Get)('top-products'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('voids'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('business_day_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getVoids", null);
__decorate([
    (0, common_1.Get)('brand/:brand_id'),
    __param(0, (0, common_1.Param)('brand_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getBrandOverview", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map