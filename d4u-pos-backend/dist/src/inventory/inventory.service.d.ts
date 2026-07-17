import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../app.gateway';
export declare class InventoryService {
    private prisma;
    private gateway;
    constructor(prisma: PrismaService, gateway: AppGateway);
    syncOfflineTransactions(store_id: number, transactions: any[]): Promise<{
        status: string;
        synced: number;
    }>;
    getNegativeInventory(store_id: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }[]>;
    deductForOrder(orderId: number): Promise<void>;
    getInventoryItems(store_id: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }[]>;
    getInventoryItem(id: number): Promise<({
        transactions: {
            id: number;
            createdAt: Date;
            operation: string;
            amount: number;
            reason: string | null;
            changed_by: number;
            inventory_id: number;
        }[];
        recipes: {
            id: number;
            quantity: number;
            unit: string;
            inventory_id: number;
            product_id: number;
        }[];
    } & {
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }) | null>;
    createInventoryItem(data: {
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level?: number;
        unit_price?: number;
    }): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }>;
    recordPurchase(store_id: number, inventory_id: number, quantity_bought: number, total_cost: number): Promise<{
        success: boolean;
        updatedItem: {
            id: number;
            store_id: number;
            name: string;
            quantity: number;
            unit: string;
            reorder_level: number;
            unit_price: number;
        };
    }>;
    importExcelData(): Promise<{
        success: boolean;
        message: string;
        itemsExtracted: number;
    }>;
    updateInventoryItem(id: number, data: {
        name?: string;
        quantity?: number;
        unit?: string;
        reorder_level?: number;
        unit_price?: number;
    }): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }>;
    deleteInventoryItem(id: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }>;
}
