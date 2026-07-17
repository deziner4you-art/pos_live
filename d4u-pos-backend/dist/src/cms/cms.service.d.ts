import { PrismaService } from '../prisma/prisma.service';
export declare class CmsService {
    private prisma;
    constructor(prisma: PrismaService);
    getBanners(brand_id?: number): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        title: string;
        isActive: boolean;
        subtitle: string | null;
        imageUrl: string;
        linkUrl: string | null;
        buttonText: string | null;
        displayOrder: number;
    }[]>;
    createBanner(data: {
        title: string;
        subtitle?: string;
        imageUrl: string;
        linkUrl?: string;
        buttonText?: string;
        isActive?: boolean;
        displayOrder?: number;
        brand_id?: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        title: string;
        isActive: boolean;
        subtitle: string | null;
        imageUrl: string;
        linkUrl: string | null;
        buttonText: string | null;
        displayOrder: number;
    }>;
    updateBanner(id: number, data: Partial<{
        title: string;
        subtitle: string;
        imageUrl: string;
        linkUrl: string;
        buttonText: string;
        isActive: boolean;
        displayOrder: number;
    }>): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        title: string;
        isActive: boolean;
        subtitle: string | null;
        imageUrl: string;
        linkUrl: string | null;
        buttonText: string | null;
        displayOrder: number;
    }>;
    deleteBanner(id: number): Promise<{
        id: number;
        createdAt: Date;
        brand_id: number;
        title: string;
        isActive: boolean;
        subtitle: string | null;
        imageUrl: string;
        linkUrl: string | null;
        buttonText: string | null;
        displayOrder: number;
    }>;
    getSettings(store_id: number): Promise<{
        store: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        } | null;
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
        id: number;
        store_id: number | null;
        brand_id: number;
        updatedAt: Date;
        address: string | null;
        siteTitle: string;
        contactPhone: string | null;
        contactEmail: string | null;
        googleMapUrl: string | null;
        facebookUrl: string | null;
        instagramUrl: string | null;
        whatsappNumber: string | null;
        twitterUrl: string | null;
        youtubeUrl: string | null;
        aboutText: string | null;
        companyText: string | null;
        module_auth_enabled: boolean;
        module_kds_enabled: boolean;
        module_loyalty_enabled: boolean;
        module_payments_enabled: boolean;
    }>;
    updateSettings(store_id: number, data: any): Promise<{
        id: number;
        store_id: number | null;
        brand_id: number;
        updatedAt: Date;
        address: string | null;
        siteTitle: string;
        contactPhone: string | null;
        contactEmail: string | null;
        googleMapUrl: string | null;
        facebookUrl: string | null;
        instagramUrl: string | null;
        whatsappNumber: string | null;
        twitterUrl: string | null;
        youtubeUrl: string | null;
        aboutText: string | null;
        companyText: string | null;
        module_auth_enabled: boolean;
        module_kds_enabled: boolean;
        module_loyalty_enabled: boolean;
        module_payments_enabled: boolean;
    }>;
    subscribeNewsletter(store_id: number, email: string): Promise<{
        id: number;
        store_id: number;
        createdAt: Date;
        email: string;
    } | {
        status: string;
    }>;
}
