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
const jsonPath = path.join(__dirname, '..', '..', 'live_orders.json');
async function main() {
    console.log('Starting JSON to PostgreSQL migration...');
    if (!fs.existsSync(jsonPath)) {
        console.log(`JSON file not found at ${jsonPath}. Skipping migration.`);
        return;
    }
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const orders = JSON.parse(rawData);
    console.log(`Found ${orders.length} orders in JSON.`);
    let insertedCount = 0;
    for (const order of orders) {
        try {
            await prisma.onlineOrder.upsert({
                where: { id: Number(order.id) },
                update: {
                    orderId: order.orderId ? Number(order.orderId) : null,
                    status: order.status || 'PENDING',
                    kdsStatus: order.kdsStatus || 'PENDING',
                    type: order.type || 'Online',
                    source: order.source || 'Website',
                    customer: order.customer || 'Online Guest',
                    customerPhone: order.customerPhone || '',
                    customerAddress: order.customerAddress || '',
                    items: typeof order.items === 'string' ? order.items : JSON.stringify(order.items),
                    totalAmount: String(order.totalAmount || '0.00'),
                    notes: order.notes || '',
                    prepTimeMinutes: Number(order.prepTimeMinutes || 0),
                    estimatedReadyAt: order.estimatedReadyAt || '',
                    timePlaced: order.timePlaced || '',
                    riderAssigned: !!order.riderAssigned,
                    feedback: order.feedback || undefined,
                    delivery: order.delivery || undefined,
                },
                create: {
                    id: Number(order.id),
                    orderId: order.orderId ? Number(order.orderId) : null,
                    status: order.status || 'PENDING',
                    kdsStatus: order.kdsStatus || 'PENDING',
                    type: order.type || 'Online',
                    source: order.source || 'Website',
                    customer: order.customer || 'Online Guest',
                    customerPhone: order.customerPhone || '',
                    customerAddress: order.customerAddress || '',
                    items: typeof order.items === 'string' ? order.items : JSON.stringify(order.items),
                    totalAmount: String(order.totalAmount || '0.00'),
                    notes: order.notes || '',
                    prepTimeMinutes: Number(order.prepTimeMinutes || 0),
                    estimatedReadyAt: order.estimatedReadyAt || '',
                    timePlaced: order.timePlaced || '',
                    riderAssigned: !!order.riderAssigned,
                    feedback: order.feedback || undefined,
                    delivery: order.delivery || undefined,
                },
            });
            insertedCount++;
        }
        catch (err) {
            console.error(`Failed to migrate order #${order.id}:`, err);
        }
    }
    console.log(`Successfully migrated ${insertedCount}/${orders.length} orders.`);
    try {
        await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"OnlineOrder"', 'id'), COALESCE((SELECT MAX(id) FROM "OnlineOrder"), 1));`);
        console.log('PostgreSQL ID sequence updated successfully.');
    }
    catch (err) {
        console.error('Failed to update PostgreSQL ID sequence:', err);
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=migrate-json-to-pg.js.map