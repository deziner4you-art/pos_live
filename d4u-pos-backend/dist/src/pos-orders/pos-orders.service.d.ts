import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../app.gateway';
import { InventoryService } from '../inventory/inventory.service';
import { CustomersService } from '../customers/customers.service';
export declare class PosOrdersService {
    private prisma;
    private gateway;
    private inventoryService;
    private customersService;
    constructor(prisma: PrismaService, gateway: AppGateway, inventoryService: InventoryService, customersService: CustomersService);
    getOrders(store_id: number, business_day_id?: number): Promise<({
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
            special_inst: string | null;
            order_id: number;
            product_id: number;
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
    getOrder(id: number): Promise<{
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
            special_inst: string | null;
            order_id: number;
            product_id: number;
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
    createOrder(body: {
        store_id: number;
        created_by: number;
        customer_id?: number;
        items: {
            product_id: number;
            quantity: number;
            price: number;
            special_inst?: string;
        }[];
        discount?: number;
        payment_method?: string;
        order_source?: string;
        table_no?: string;
        is_offline?: boolean;
        delivery_address?: string;
        notes?: string;
    }): Promise<{
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
                special_inst: string | null;
                order_id: number;
                product_id: number;
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
    voidOrder(id: number, body: {
        void_reason: string;
        manager_pin: string;
        approved_by: number;
    }): Promise<{
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
    settleOrder(id: number, body: {
        payment_method: string;
        amount_received?: number;
    }): Promise<{
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
    getSalesSummary(store_id: number, business_day_id?: number): Promise<{
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
    syncOfflineOrders(orders: any[]): Promise<{
        success: boolean;
        syncedCount: number;
    }>;
}
