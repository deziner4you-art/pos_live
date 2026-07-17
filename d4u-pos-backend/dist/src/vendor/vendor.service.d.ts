import { PrismaService } from '../prisma/prisma.service';
export declare class VendorService {
    private prisma;
    constructor(prisma: PrismaService);
    getVendors(store_id: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        ledger_balance: number;
    }[]>;
    createPO(body: {
        store_id: number;
        vendor_id: number;
        items: {
            inventory_id: number;
            ordered_qty: number;
            price_unit: number;
        }[];
    }): Promise<{
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
    receivePO(poId: number, body: {
        received_items: {
            po_item_id: number;
            received_qty: number;
        }[];
        payment_status: string;
    }): Promise<{
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
