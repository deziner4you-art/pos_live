import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    getPricing(): Promise<{
        id: number;
        currency: string;
        module_key: string;
        module_name: string;
        price_monthly: number;
    }[] | {
        module_key: string;
        module_name: string;
        price_monthly: number;
        currency: string;
    }[]>;
    onboardClient(body: any): Promise<{
        success: boolean;
        brand: {
            id: number;
            name: string;
            createdAt: Date;
            is_chain_store: boolean;
            menu_strategy: string;
            currency: string;
            vat_percentage: number;
        };
        store: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        };
        subscription: {
            status: string;
            id: number;
            createdAt: Date;
            brand_id: number;
            updatedAt: Date;
            module_auth_enabled: boolean;
            module_kds_enabled: boolean;
            module_loyalty_enabled: boolean;
            plan_name: string;
            module_riders_enabled: boolean;
            module_tv_board_enabled: boolean;
            module_online_website_enabled: boolean;
            module_waiter_terminal_enabled: boolean;
            module_analytics_enabled: boolean;
            billing_amount: number;
        };
    }>;
    createOrUpdateSubscription(body: any): Promise<{
        status: string;
        id: number;
        createdAt: Date;
        brand_id: number;
        updatedAt: Date;
        module_auth_enabled: boolean;
        module_kds_enabled: boolean;
        module_loyalty_enabled: boolean;
        plan_name: string;
        module_riders_enabled: boolean;
        module_tv_board_enabled: boolean;
        module_online_website_enabled: boolean;
        module_waiter_terminal_enabled: boolean;
        module_analytics_enabled: boolean;
        billing_amount: number;
    }>;
    getSubscription(brand_id: number): Promise<({
        brand: {
            id: number;
            name: string;
            createdAt: Date;
            is_chain_store: boolean;
            menu_strategy: string;
            currency: string;
            vat_percentage: number;
        };
    } & {
        status: string;
        id: number;
        createdAt: Date;
        brand_id: number;
        updatedAt: Date;
        module_auth_enabled: boolean;
        module_kds_enabled: boolean;
        module_loyalty_enabled: boolean;
        plan_name: string;
        module_riders_enabled: boolean;
        module_tv_board_enabled: boolean;
        module_online_website_enabled: boolean;
        module_waiter_terminal_enabled: boolean;
        module_analytics_enabled: boolean;
        billing_amount: number;
    }) | {
        brand_id: number;
        plan_name: string;
        module_auth_enabled: boolean;
        module_kds_enabled: boolean;
        module_riders_enabled: boolean;
        module_loyalty_enabled: boolean;
        module_tv_board_enabled: boolean;
        module_online_website_enabled: boolean;
        module_analytics_enabled: boolean;
        billing_amount: number;
        brand: {
            is_chain_store: boolean;
            menu_strategy: string;
            currency: string;
            vat_percentage: number;
        };
    }>;
}
