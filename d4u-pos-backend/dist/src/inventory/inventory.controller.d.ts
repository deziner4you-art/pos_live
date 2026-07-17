import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    syncOffline(body: {
        store_id: number;
        transactions: any[];
    }): Promise<{
        status: string;
        synced: number;
    }>;
    getNegativeInventory(storeId: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        quantity: number;
        unit: string;
        reorder_level: number;
        unit_price: number;
    }[]>;
    getInventoryItems(storeId: number): Promise<{
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
    createInventoryItem(body: {
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
    updateInventoryItem(id: number, body: {
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
    recordPurchase(body: {
        store_id: number;
        inventory_id: number;
        quantity: number;
        total_cost: number;
    }): Promise<{
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
    importExcel(): Promise<{
        success: boolean;
        message: string;
        itemsExtracted: number;
    }>;
}
