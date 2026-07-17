import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDailyReport(store_id: number, date?: string): Promise<{
        date: string;
        totalSales: number;
        totalOrders: number;
        totalDiscount: number;
        voidedOrders: number;
        onlineOrders: number;
        cashOrders: number;
        cardOrders: number;
        avgOrderValue: number;
    }>;
    getBranchAnalytics(store_id: number, start_date?: string, end_date?: string, business_day_id?: number, cashier_id?: number): Promise<{
        overview: {
            posSales: number;
            onlineSales: number;
            totalSales: number;
            totalDiscount: number;
            posOrders: number;
            onlineOrders: number;
            totalOrders: number;
            voidedCount: number;
        };
        cashierBreakdown: any[];
    }>;
    getShifts(store_id: number, limit?: number): Promise<({
        starter: {
            id: number;
            name: string;
        };
        closer: {
            id: number;
            name: string;
        } | null;
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        notes: string | null;
        started_by: number;
        closed_by: number | null;
        dayStart: Date;
        dayClose: Date | null;
        openingFloat: number;
        closingCash: number | null;
        totalSales: number | null;
        totalOrders: number | null;
    })[]>;
    getTopProducts(store_id: number, limit?: number): Promise<{
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
        } | null;
        total_qty: number | null;
        total_orders: number;
    }[]>;
    getVoidedOrders(store_id: number, business_day_id?: number): Promise<({
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
        approver: {
            id: number;
            name: string;
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
    })[]>;
    getBrandOverview(brand_id: number): Promise<{
        brand_id: number;
        stores: {
            store_id: number;
            store_name: string;
            location: string | null;
            today_sales: number;
            today_orders: number;
        }[];
        grand_total: number;
    }>;
    getWeeklyTrend(store_id: number): Promise<{
        date: string;
        sales: number;
        orders: number;
    }[]>;
}
