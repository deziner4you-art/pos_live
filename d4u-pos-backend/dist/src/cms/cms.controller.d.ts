import { CmsService } from './cms.service';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    getBannersByBrand(brandId: string): Promise<{
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
    getBanners(): Promise<{
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
    createBanner(file: any, body: any): Promise<{
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
    updateBanner(id: number, body: any): Promise<{
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
    getSettingsByStore(storeId: string): Promise<{
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
    getSettings(): Promise<{
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
    updateSettings(storeId: number, body: any): Promise<{
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
    subscribe(body: {
        store_id: number;
        email: string;
    }): Promise<{
        id: number;
        store_id: number;
        createdAt: Date;
        email: string;
    } | {
        status: string;
    }>;
}
