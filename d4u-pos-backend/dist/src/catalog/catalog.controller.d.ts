import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly service;
    constructor(service: CatalogService);
    syncCatalog(store_id: string): Promise<{
        categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
        products: ({
            categories: {
                id: number;
                store_id: number;
                name: string;
                menu_id: number | null;
            }[];
        } & {
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
        })[];
        synced_at: string;
    }>;
    getMenus(): Promise<({
        stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    })[]>;
    createMenu(body: {
        name: string;
        brand_id?: number;
        store_ids?: number[];
    }): Promise<{
        stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    updateMenu(id: string, body: {
        name?: string;
        store_ids?: number[];
    }): Promise<{
        stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    duplicateMenu(id: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    deleteMenu(id: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    getCategories(store_id: string): Promise<({
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            isActive: boolean;
        } | null;
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
    } & {
        id: number;
        store_id: number;
        name: string;
        menu_id: number | null;
    })[]>;
    createCategory(body: {
        store_id: number;
        name: string;
        menu_id?: number;
        store_ids?: number[];
    }): Promise<{
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            isActive: boolean;
        } | null;
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
    } & {
        id: number;
        store_id: number;
        name: string;
        menu_id: number | null;
    }>;
    updateCategory(id: string, body: {
        name?: string;
        menu_id?: number;
        store_ids?: number[];
    }): Promise<{
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            brand_id: number;
            isActive: boolean;
        } | null;
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
    } & {
        id: number;
        store_id: number;
        name: string;
        menu_id: number | null;
    }>;
    deleteCategory(id: string): Promise<{
        id: number;
        store_id: number;
        name: string;
        menu_id: number | null;
    }>;
    getProducts(store_id: string): Promise<({
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
    } & {
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
    })[]>;
    createProduct(body: {
        store_id: number;
        category_ids: number[];
        name: string;
        price: number;
        cost: number;
        margin_pct: number;
        sku?: string;
        image_url?: string;
        status?: string;
        assigned_store_ids?: number[];
    }): Promise<{
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
    } & {
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
    }>;
    updateProduct(id: string, body: {
        name?: string;
        price?: number;
        cost?: number;
        margin_pct?: number;
        is_active?: boolean;
        sku?: string;
        image_url?: string;
        status?: string;
        assigned_store_ids?: number[];
        category_ids?: number[];
    }): Promise<{
        assigned_stores: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        }[];
        categories: {
            id: number;
            store_id: number;
            name: string;
            menu_id: number | null;
        }[];
    } & {
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
    }>;
    approveProduct(id: string): Promise<{
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
    }>;
    deleteProduct(id: string): Promise<{
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
    }>;
}
