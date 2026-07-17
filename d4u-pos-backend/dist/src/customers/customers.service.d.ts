import { PrismaService } from '../prisma/prisma.service';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    getCustomers(brand_id: number, search?: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        phone: string;
        address: string | null;
        total_orders: number;
        loyalty_points: number;
    }[]>;
    findByPhone(phone: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        phone: string;
        address: string | null;
        total_orders: number;
        loyalty_points: number;
    }>;
    getCustomerOrders(id: number): Promise<{
        orders: ({
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
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        phone: string;
        address: string | null;
        total_orders: number;
        loyalty_points: number;
    }>;
    createCustomer(body: {
        brand_id: number;
        phone: string;
        name: string;
        address?: string;
    }): Promise<{
        success: boolean;
        customer: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            phone: string;
            address: string | null;
            total_orders: number;
            loyalty_points: number;
        };
    }>;
    updateCustomer(id: number, body: {
        name?: string;
        address?: string;
    }): Promise<{
        success: boolean;
        customer: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            phone: string;
            address: string | null;
            total_orders: number;
            loyalty_points: number;
        };
    }>;
    earnPoints(customer_id: number, order_id: number, order_amount: number): Promise<{
        points: number;
        success?: undefined;
    } | {
        success: boolean;
        points: number;
    }>;
    redeemPoints(customer_id: number, points: number): Promise<{
        success: boolean;
        points_used: number;
        discount_amount: number;
    }>;
    getWalletBalance(customer_id: number): Promise<{
        transactions: {
            id: number;
            createdAt: Date;
            description: string | null;
            type: string;
            customer_id: number;
            order_id: number | null;
            points: number;
        }[];
        id: number;
        name: string;
        phone: string;
        loyalty_points: number;
    }>;
}
