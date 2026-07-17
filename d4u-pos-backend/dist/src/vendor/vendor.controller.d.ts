import { VendorService } from './vendor.service';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    getVendors(store_id: string): Promise<{
        id: number;
        store_id: number;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        ledger_balance: number;
    }[]>;
    createPO(body: any): Promise<{
        items: {
            id: number;
            inventory_id: number;
            ordered_qty: number;
            received_qty: number;
            price_unit: number;
            po_id: number;
        }[];
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        total_amount: number;
        payment_status: string;
        deliveredAt: Date | null;
        vendor_id: number;
    }>;
    receivePO(id: string, body: any): Promise<{
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        total_amount: number;
        payment_status: string;
        deliveredAt: Date | null;
        vendor_id: number;
    }>;
}
