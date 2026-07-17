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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
async function main() {
    const jsonPath = path.join(__dirname, '../../..', 'live_orders.json');
    if (!fs.existsSync(jsonPath)) {
        console.error(`[MIGRATION] File not found: ${jsonPath}`);
        process.exit(1);
    }
    console.log(`[MIGRATION] Reading data from ${jsonPath}...`);
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    let orders = [];
    try {
        orders = JSON.parse(rawData);
    }
    catch (err) {
        console.error('[MIGRATION] Invalid JSON in live_orders.json');
        process.exit(1);
    }
    console.log(`[MIGRATION] Found ${orders.length} orders. Starting migration...`);
    for (const order of orders) {
        const existing = await prisma.onlineOrder.findFirst({
            where: { orderId: order.orderId },
        });
        if (existing) {
            console.log(`[MIGRATION] Order ID ${order.orderId} already exists. Skipping.`);
            continue;
        }
        try {
            await prisma.onlineOrder.create({
                data: {
                    orderId: order.orderId,
                    status: order.status || 'PENDING',
                    kdsStatus: order.kdsStatus || 'PENDING',
                    type: order.type || 'Online',
                    source: order.source || 'Website',
                    customer: order.customer || 'Guest',
                    customerPhone: order.customerPhone || '',
                    customerAddress: order.customerAddress || '',
                    items: order.items || '',
                    totalAmount: order.totalAmount?.toString() || '0',
                    notes: order.notes || '',
                    prepTimeMinutes: order.prepTimeMinutes || 0,
                    estimatedReadyAt: order.estimatedReadyAt || '',
                    timePlaced: order.timePlaced || new Date().toISOString(),
                    riderAssigned: order.riderAssigned || false,
                    feedback: order.feedback || null,
                    delivery: order.delivery || null,
                },
            });
            console.log(`[MIGRATION] Successfully migrated order ${order.orderId}`);
        }
        catch (err) {
            console.error(`[MIGRATION] Failed to migrate order ${order.orderId}:`, err);
        }
    }
    console.log('[MIGRATION] Migration completed successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=migrate-orders.js.map