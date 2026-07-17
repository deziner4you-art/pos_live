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
const xlsx = __importStar(require("xlsx"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const filePath = 'C:\\Users\\dezin\\Downloads\\Final NEW COSTING SHEET.xls';
    console.log('Reading file from:', filePath);
    const workbook = xlsx.readFile(filePath);
    let totalAdded = 0;
    let totalSkipped = 0;
    for (const sheetName of workbook.SheetNames) {
        console.log(`\n--- Processing Sheet: ${sheetName} ---`);
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
        let itemKey = '';
        let startIndex = 0;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (const key of Object.keys(row)) {
                if (typeof row[key] === 'string' && row[key].trim().toUpperCase().includes('ITEM')) {
                    itemKey = key;
                    startIndex = i + 1;
                    break;
                }
            }
            if (itemKey)
                break;
        }
        if (!itemKey) {
            console.log(`Could not find a cell with "ITEM" to identify the column in sheet ${sheetName}. Skipping sheet.`);
            continue;
        }
        console.log(`Found "ITEM" header at row index ${startIndex - 1}, key is "${itemKey}"`);
        let added = 0;
        let skipped = 0;
        for (let i = startIndex; i < rows.length; i++) {
            const row = rows[i];
            let itemName = row[itemKey];
            if (typeof itemName !== 'string')
                continue;
            itemName = itemName.trim();
            if (!itemName || itemName.toUpperCase().includes('ITEM') || itemName.toUpperCase().includes('TOTAL'))
                continue;
            const existing = await prisma.inventoryItem.findFirst({
                where: { name: itemName, store_id: 1 }
            });
            if (existing) {
                skipped++;
                totalSkipped++;
                continue;
            }
            await prisma.inventoryItem.create({
                data: {
                    store_id: 1,
                    name: itemName,
                    quantity: 0,
                    unit: 'kg',
                    reorder_level: 0,
                    unit_price: 0
                }
            });
            added++;
            totalAdded++;
            console.log(`Added: ${itemName}`);
        }
        console.log(`Sheet "${sheetName}" complete. Added: ${added}, Skipped: ${skipped}`);
    }
    console.log(`\n=== IMPORT FINISHED ===\nTotal Added: ${totalAdded}\nTotal Skipped: ${totalSkipped}`);
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=import-xls.js.map