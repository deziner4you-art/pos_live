"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const xlsx = __importStar(require("xlsx"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const app_gateway_1 = require("../app.gateway");
let InventoryService = class InventoryService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async syncOfflineTransactions(store_id, transactions) {
        return this.prisma.$transaction(async (tx) => {
            let totalSynced = 0;
            for (const t of transactions) {
                await tx.inventoryTransactionLog.create({
                    data: {
                        inventory_id: t.inventory_id,
                        operation: t.operation,
                        amount: t.amount,
                        reason: t.reason || 'Offline Sync',
                        changed_by: t.changed_by
                    }
                });
                const modifier = t.operation === 'SUBTRACT' ? -t.amount : t.amount;
                await tx.inventoryItem.update({
                    where: { id: t.inventory_id },
                    data: {
                        quantity: { increment: modifier }
                    }
                });
                totalSynced++;
            }
            return { status: 'success', synced: totalSynced };
        });
    }
    async getNegativeInventory(store_id) {
        return this.prisma.inventoryItem.findMany({
            where: {
                store_id,
                quantity: { lt: 0 }
            }
        });
    }
    async deductForOrder(orderId) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
                include: { items: { include: { product: { include: { recipeItems: true } } } } }
            });
            if (!order)
                return;
            const storeId = order.store_id;
            for (const item of order.items) {
                if (!item.product || !item.product.recipeItems)
                    continue;
                for (const recipe of item.product.recipeItems) {
                    const deductionAmount = recipe.quantity_needed * item.quantity;
                    const updatedItem = await this.prisma.inventoryItem.update({
                        where: { id: recipe.inventory_id },
                        data: { quantity: { decrement: deductionAmount } }
                    });
                    await this.prisma.inventoryTransactionLog.create({
                        data: {
                            inventory_id: recipe.inventory_id,
                            operation: 'SUBTRACT',
                            amount: deductionAmount,
                            reason: `Auto-deduct for Order #${order.id}`,
                            changed_by: order.created_by || 1
                        }
                    });
                    if (updatedItem.quantity < 0) {
                        this.gateway.server.emit('negative_inventory_alert', {
                            store_id: storeId,
                            inventory_id: updatedItem.id,
                            name: updatedItem.name,
                            balance: updatedItem.quantity
                        });
                    }
                }
            }
        }
        catch (e) {
            console.error(`[InventoryService] Error deducting for order ${orderId}:`, e);
        }
    }
    async getInventoryItems(store_id) {
        return this.prisma.inventoryItem.findMany({
            where: { store_id },
            orderBy: { id: 'desc' }
        });
    }
    async getInventoryItem(id) {
        return this.prisma.inventoryItem.findUnique({
            where: { id },
            include: { recipes: true, transactions: true }
        });
    }
    async createInventoryItem(data) {
        return this.prisma.inventoryItem.create({
            data: {
                store_id: data.store_id,
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                reorder_level: data.reorder_level || 0,
                unit_price: data.unit_price || 0,
            }
        });
    }
    async recordPurchase(store_id, inventory_id, quantity_bought, total_cost) {
        return this.prisma.$transaction(async (tx) => {
            const item = await tx.inventoryItem.findUnique({ where: { id: inventory_id } });
            if (!item)
                throw new Error('Inventory item not found');
            const currentQuantity = item.quantity > 0 ? item.quantity : 0;
            const currentTotalValue = currentQuantity * (item.unit_price || 0);
            const newTotalValue = currentTotalValue + total_cost;
            const newTotalQuantity = currentQuantity + quantity_bought;
            const newUnitPrice = newTotalValue / newTotalQuantity;
            const updatedItem = await tx.inventoryItem.update({
                where: { id: inventory_id },
                data: {
                    quantity: { increment: quantity_bought },
                    unit_price: newUnitPrice
                }
            });
            await tx.inventoryTransactionLog.create({
                data: {
                    inventory_id,
                    operation: 'ADD',
                    amount: quantity_bought,
                    reason: `Purchased Stock (Cost: ${total_cost}, Avg: ${newUnitPrice.toFixed(2)})`,
                    changed_by: 1
                }
            });
            return { success: true, updatedItem };
        });
    }
    async importExcelData() {
        const downloadsPath = path.join(os.homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, 'Final NEW COSTING SHEET.xls');
        let workbook;
        try {
            workbook = xlsx.readFile(filePath);
        }
        catch (e) {
            throw new common_1.NotFoundException(`Excel file not found at ${filePath}. Please ensure the file exists.`);
        }
        const uniqueItems = new Map();
        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            for (const row of data) {
                if (!Array.isArray(row))
                    continue;
                for (let i = 0; i < row.length; i++) {
                    if (typeof row[i] === 'string' && row[i].trim() &&
                        !row[i].toUpperCase().includes('TOTAL') &&
                        !row[i].toUpperCase().includes('COST') &&
                        !row[i].toUpperCase().includes('SALE')) {
                        if (typeof row[i + 1] === 'number' && typeof row[i + 2] === 'number') {
                            const itemName = row[i].trim().replace(/\s+/g, ' ');
                            const unitPrice = row[i + 2];
                            if (['ITEM', 'QTY', 'PRICE', 'DESCRIPTION', 'SR.NO', 'ITEM NAME'].includes(itemName.toUpperCase()))
                                continue;
                            if (!uniqueItems.has(itemName)) {
                                uniqueItems.set(itemName, unitPrice);
                            }
                            break;
                        }
                    }
                }
            }
        }
        let importedCount = 0;
        const store_id = 1;
        for (const [name, price] of uniqueItems.entries()) {
            const existing = await this.prisma.inventoryItem.findFirst({
                where: { store_id, name: { equals: name, mode: 'insensitive' } }
            });
            if (!existing) {
                await this.prisma.inventoryItem.create({
                    data: {
                        store_id,
                        name,
                        quantity: 0,
                        unit: 'unit',
                        reorder_level: 0,
                        unit_price: price
                    }
                });
                importedCount++;
            }
            else {
                await this.prisma.inventoryItem.update({
                    where: { id: existing.id },
                    data: { unit_price: price }
                });
            }
        }
        return {
            success: true,
            message: `Extracted ${uniqueItems.size} unique raw materials. Imported ${importedCount} new items to DB.`,
            itemsExtracted: uniqueItems.size
        };
    }
    async updateInventoryItem(id, data) {
        return this.prisma.inventoryItem.update({
            where: { id },
            data,
        });
    }
    async deleteInventoryItem(id) {
        return this.prisma.inventoryItem.delete({
            where: { id },
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map