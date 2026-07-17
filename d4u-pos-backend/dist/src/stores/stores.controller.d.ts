import { StoresService } from './stores.service';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    getAllStores(): Promise<({
        brand: {
            id: number;
            name: string;
            createdAt: Date;
            is_chain_store: boolean;
            menu_strategy: string;
            currency: string;
            vat_percentage: number;
        };
        saas_package: {
            id: number;
            name: string;
            price: number;
            has_pos: boolean;
            has_website: boolean;
            has_customer_app: boolean;
            has_rider_app: boolean;
            has_kds: boolean;
            has_tv_board: boolean;
            has_warehouse: boolean;
            has_recipes: boolean;
            has_marketing: boolean;
            has_loyalty: boolean;
            has_accounts: boolean;
            has_manager_app: boolean;
            has_waiter_terminal: boolean;
        } | null;
    } & {
        id: number;
        name: string;
        createdAt: Date;
        location: string | null;
        is_online: boolean;
        brand_id: number;
        saas_package_id: number | null;
    })[]>;
    getStore(id: number): Promise<{
        brand: {
            id: number;
            name: string;
            createdAt: Date;
            is_chain_store: boolean;
            menu_strategy: string;
            currency: string;
            vat_percentage: number;
        };
        saas_package: {
            id: number;
            name: string;
            price: number;
            has_pos: boolean;
            has_website: boolean;
            has_customer_app: boolean;
            has_rider_app: boolean;
            has_kds: boolean;
            has_tv_board: boolean;
            has_warehouse: boolean;
            has_recipes: boolean;
            has_marketing: boolean;
            has_loyalty: boolean;
            has_accounts: boolean;
            has_manager_app: boolean;
            has_waiter_terminal: boolean;
        } | null;
    } & {
        id: number;
        name: string;
        createdAt: Date;
        location: string | null;
        is_online: boolean;
        brand_id: number;
        saas_package_id: number | null;
    }>;
    createStore(body: {
        name: string;
        brand_id: number;
        location?: string;
        is_online?: boolean;
        saas_package_id?: number;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        location: string | null;
        is_online: boolean;
        brand_id: number;
        saas_package_id: number | null;
    }>;
    updateStore(id: number, body: {
        name?: string;
        location?: string;
        is_online?: boolean;
        saas_package_id?: number;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        location: string | null;
        is_online: boolean;
        brand_id: number;
        saas_package_id: number | null;
    }>;
    deleteStore(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        location: string | null;
        is_online: boolean;
        brand_id: number;
        saas_package_id: number | null;
    }>;
}
