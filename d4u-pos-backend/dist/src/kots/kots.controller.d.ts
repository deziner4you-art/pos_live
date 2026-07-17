import { KotsService } from './kots.service';
export declare class KotsController {
    private readonly service;
    constructor(service: KotsService);
    getActiveKots(store_id: string): Promise<({
        order: {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            business_day_id: number | null;
            customer_id: number | null;
            business_date: Date;
            total_amount: number;
            discount: number;
            order_source: string;
            payment_method: string;
            payment_status: string;
            rider_id: number | null;
            delivery_address: string | null;
            is_offline: boolean;
            table_no: string | null;
            created_by: number;
            void_reason: string | null;
            void_approved_by: number | null;
            customer_feedback: string | null;
            rating: number | null;
        };
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        items: import("@prisma/client/runtime/library").JsonValue;
        business_day_id: number | null;
        order_id: number;
        printCount: number;
        acceptedAt: Date | null;
        readyAt: Date | null;
    })[]>;
    getKotsByDay(store_id: string, business_day_id: string): Promise<({
        order: {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            business_day_id: number | null;
            customer_id: number | null;
            business_date: Date;
            total_amount: number;
            discount: number;
            order_source: string;
            payment_method: string;
            payment_status: string;
            rider_id: number | null;
            delivery_address: string | null;
            is_offline: boolean;
            table_no: string | null;
            created_by: number;
            void_reason: string | null;
            void_approved_by: number | null;
            customer_feedback: string | null;
            rating: number | null;
        };
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        items: import("@prisma/client/runtime/library").JsonValue;
        business_day_id: number | null;
        order_id: number;
        printCount: number;
        acceptedAt: Date | null;
        readyAt: Date | null;
    })[]>;
    getKot(id: string): Promise<{
        order: {
            items: ({
                product: {
                    status: string;
                    id: number;
                    store_id: number;
                    name: string;
                    createdAt: Date;
                    price: number;
                    cost: number;
                    margin_pct: number;
                    is_active: boolean;
                    sku: string | null;
                    image_url: string | null;
                };
            } & {
                id: number;
                quantity: number;
                price: number;
                product_id: number;
                order_id: number;
                special_inst: string | null;
            })[];
        } & {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            business_day_id: number | null;
            customer_id: number | null;
            business_date: Date;
            total_amount: number;
            discount: number;
            order_source: string;
            payment_method: string;
            payment_status: string;
            rider_id: number | null;
            delivery_address: string | null;
            is_offline: boolean;
            table_no: string | null;
            created_by: number;
            void_reason: string | null;
            void_approved_by: number | null;
            customer_feedback: string | null;
            rating: number | null;
        };
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        items: import("@prisma/client/runtime/library").JsonValue;
        business_day_id: number | null;
        order_id: number;
        printCount: number;
        acceptedAt: Date | null;
        readyAt: Date | null;
    }>;
    updateStatus(id: string, body: {
        status: 'PREPARING' | 'READY' | 'CANCELLED';
    }): Promise<{
        success: boolean;
        kot: {
            order: {
                status: string;
                id: number;
                store_id: number;
                createdAt: Date;
                business_day_id: number | null;
                customer_id: number | null;
                business_date: Date;
                total_amount: number;
                discount: number;
                order_source: string;
                payment_method: string;
                payment_status: string;
                rider_id: number | null;
                delivery_address: string | null;
                is_offline: boolean;
                table_no: string | null;
                created_by: number;
                void_reason: string | null;
                void_approved_by: number | null;
                customer_feedback: string | null;
                rating: number | null;
            };
        } & {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            items: import("@prisma/client/runtime/library").JsonValue;
            business_day_id: number | null;
            order_id: number;
            printCount: number;
            acceptedAt: Date | null;
            readyAt: Date | null;
        };
    }>;
    incrementPrint(id: string): Promise<{
        success: boolean;
        printCount: number;
    }>;
}
