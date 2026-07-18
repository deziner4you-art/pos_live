import { PosOrdersService } from './pos-orders.service';
export declare class PosOrdersController {
    private readonly service;
    constructor(service: PosOrdersService);
    getOrders(store_id: string, business_day_id?: string): Promise<({
        customer: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            phone: string;
            address: string | null;
            total_orders: number;
            loyalty_points: number;
        } | null;
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
            special_inst: string | null;
            order_id: number;
            variant_id: number | null;
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
    })[]>;
    getSummary(store_id: string, business_day_id?: string): Promise<{
        total: number;
        orders: number;
        voids: number;
        business_day_id?: undefined;
    } | {
        total: number;
        orders: number;
        voids: number;
        business_day_id: number;
    }>;
    getOrder(id: string): Promise<{
        customer: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            phone: string;
            address: string | null;
            total_orders: number;
            loyalty_points: number;
        } | null;
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
            special_inst: string | null;
            order_id: number;
            variant_id: number | null;
        })[];
        kot: {
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
        } | null;
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
    }>;
    createOrder(body: any): Promise<{
        success: boolean;
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
                special_inst: string | null;
                order_id: number;
                variant_id: number | null;
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
    }>;
    voidOrder(id: string, body: any): Promise<{
        success: boolean;
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
    }>;
    settleOrder(id: string, body: any): Promise<{
        success: boolean;
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
    }>;
    syncOffline(body: {
        orders: any[];
    }): Promise<{
        success: boolean;
        syncedCount: number;
    }>;
}
