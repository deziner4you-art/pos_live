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
exports.KotsController = void 0;
const common_1 = require("@nestjs/common");
const kots_service_1 = require("./kots.service");
let KotsController = class KotsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getActiveKots(store_id) {
        console.log(`[GET] Active KOTs — Store: ${store_id}`);
        return this.service.getActiveKots(Number(store_id));
    }
    getKotsByDay(store_id, business_day_id) {
        return this.service.getKotsByDay(Number(store_id), Number(business_day_id));
    }
    getKot(id) {
        return this.service.getKot(Number(id));
    }
    updateStatus(id, body) {
        console.log(`[KDS] KOT #${id} → ${body.status}`);
        return this.service.updateKotStatus(Number(id), body.status);
    }
    incrementPrint(id) {
        return this.service.incrementPrintCount(Number(id));
    }
};
exports.KotsController = KotsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KotsController.prototype, "getActiveKots", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('store_id')),
    __param(1, (0, common_1.Query)('business_day_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], KotsController.prototype, "getKotsByDay", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KotsController.prototype, "getKot", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], KotsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/print'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KotsController.prototype, "incrementPrint", null);
exports.KotsController = KotsController = __decorate([
    (0, common_1.Controller)('kots'),
    __metadata("design:paramtypes", [kots_service_1.KotsService])
], KotsController);
//# sourceMappingURL=kots.controller.js.map