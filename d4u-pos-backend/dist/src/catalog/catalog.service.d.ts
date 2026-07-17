import { PrismaService } from '../prisma/prisma.service';
export declare class CatalogService {
    private prisma;
    constructor(prisma: PrismaService);
    syncCatalogForPos(store_id: number): Promise<{
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
            variants: {
                id: number;
                name: string;
                price: number;
                product_id: number;
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
    createMenu(data: {
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
    updateMenu(id: number, data: {
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
    duplicateMenu(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    deleteMenu(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        brand_id: number;
        isActive: boolean;
    }>;
    getCategories(store_id: number): Promise<({
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
    createCategory(store_id: number, name: string, menu_id?: number, store_ids?: number[]): Promise<{
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
    updateCategory(id: number, data: {
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
    deleteCategory(id: number): Promise<{
        id: number;
        store_id: number;
        name: string;
        menu_id: number | null;
    }>;
    getProducts(store_id: number): Promise<({
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
        variants: {
            id: number;
            name: string;
            price: number;
            product_id: number;
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
    createProduct(data: {
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
        variants?: {
            name: string;
            price: number;
        }[];
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
        variants: {
            id: number;
            name: string;
            price: number;
            product_id: number;
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
    updateProduct(id: number, data: {
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
        variants?: {
            name: string;
            price: number;
        }[];
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
        variants: {
            id: number;
            name: string;
            price: number;
            product_id: number;
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
    approveProduct(id: number): Promise<{
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
    deleteProduct(id: number): Promise<{
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
