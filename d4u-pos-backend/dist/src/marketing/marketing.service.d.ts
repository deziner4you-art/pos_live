import { PrismaService } from '../prisma/prisma.service';
export declare class MarketingService {
    private prisma;
    constructor(prisma: PrismaService);
    calculateSlaPerformance(agencyName: string, baselineTarget: number, achievedOrders: number, retainerFee: number): {
        agency: string;
        status: string;
        baseline_target: number;
        achieved: number;
        bonus_penalty_amount: number;
        final_payout: number;
        message: string;
    };
    generateAffiliateLink(affiliateId: string, storeId: number, platform: string): {
        affiliate_id: string;
        platform: string;
        deep_link: string;
        qr_code_data: string;
        commission_rule: string;
    };
    createCampaign(body: any): Promise<{
        success: boolean;
        message: string;
        campaign: {
            target_stores: {
                id: number;
                name: string;
                createdAt: Date;
                location: string | null;
                is_online: boolean;
                brand_id: number;
                saas_package_id: number | null;
            }[];
            target_categories: {
                id: number;
                store_id: number;
                name: string;
                menu_id: number | null;
            }[];
            target_products: {
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
            }[];
        } & {
            status: string;
            id: number;
            createdAt: Date;
            brand_id: number;
            is_active: boolean;
            image_url: string | null;
            description: string | null;
            title: string;
            discount_pct: number;
            published_pos: boolean;
            published_web: boolean;
            published_social: boolean;
            scheduled_at: Date | null;
            published_facebook: boolean;
            published_instagram: boolean;
        };
    }>;
    getCampaigns(store_id?: number): Promise<({
        target_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        target_categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
        target_products: {
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
        }[];
    } & {
        status: string;
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        description: string | null;
        title: string;
        discount_pct: number;
        published_pos: boolean;
        published_web: boolean;
        published_social: boolean;
        scheduled_at: Date | null;
        published_facebook: boolean;
        published_instagram: boolean;
    })[]>;
    updateCampaign(id: number, data: any): Promise<{
        target_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        target_categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
        target_products: {
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
        }[];
    } & {
        status: string;
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        description: string | null;
        title: string;
        discount_pct: number;
        published_pos: boolean;
        published_web: boolean;
        published_social: boolean;
        scheduled_at: Date | null;
        published_facebook: boolean;
        published_instagram: boolean;
    }>;
    deleteCampaign(id: number): Promise<{
        status: string;
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        description: string | null;
        title: string;
        discount_pct: number;
        published_pos: boolean;
        published_web: boolean;
        published_social: boolean;
        scheduled_at: Date | null;
        published_facebook: boolean;
        published_instagram: boolean;
    }>;
    createScheduledDiscount(body: any): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        title: string;
        discount_pct: number;
        target_stores: string;
        target_category_id: number | null;
        target_product_id: number | null;
        start_date: Date;
        end_date: Date;
    }>;
    getScheduledDiscounts(): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        title: string;
        discount_pct: number;
        target_stores: string;
        target_category_id: number | null;
        target_product_id: number | null;
        start_date: Date;
        end_date: Date;
    }[]>;
    updateScheduledDiscount(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        title: string;
        discount_pct: number;
        target_stores: string;
        target_category_id: number | null;
        target_product_id: number | null;
        start_date: Date;
        end_date: Date;
    }>;
    deleteScheduledDiscount(id: number): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        is_active: boolean;
        image_url: string | null;
        title: string;
        discount_pct: number;
        target_stores: string;
        target_category_id: number | null;
        target_product_id: number | null;
        start_date: Date;
        end_date: Date;
    }>;
    handleScheduledDiscounts(): Promise<void>;
}
