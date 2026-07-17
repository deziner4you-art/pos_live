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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async syncOffline(body) {
        return this.inventoryService.syncOfflineTransactions(body.store_id, body.transactions);
    }
    async getNegativeInventory(storeId) {
        return this.inventoryService.getNegativeInventory(storeId);
    }
    async getInventoryItems(storeId) {
        return this.inventoryService.getInventoryItems(storeId);
    }
    async getInventoryItem(id) {
        return this.inventoryService.getInventoryItem(id);
    }
    async createInventoryItem(body) {
        return this.inventoryService.createInventoryItem(body);
    }
    async updateInventoryItem(id, body) {
        return this.inventoryService.updateInventoryItem(id, body);
    }
    async deleteInventoryItem(id) {
        return this.inventoryService.deleteInventoryItem(id);
    }
    async recordPurchase(body) {
        return this.inventoryService.recordPurchase(body.store_id, body.inventory_id, body.quantity, body.total_cost);
    }
    async importExcel() {
        return this.inventoryService.importExcelData();
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)('sync-offline'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "syncOffline", null);
__decorate([
    (0, common_1.Get)('red-alerts/:store_id'),
    __param(0, (0, common_1.Param)('store_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getNegativeInventory", null);
__decorate([
    (0, common_1.Get)('items/:store_id'),
    __param(0, (0, common_1.Param)('store_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryItems", null);
__decorate([
    (0, common_1.Get)('item/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryItem", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createInventoryItem", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateInventoryItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "deleteInventoryItem", null);
__decorate([
    (0, common_1.Post)('purchase'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "recordPurchase", null);
__decorate([
    (0, common_1.Post)('import-excel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "importExcel", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map