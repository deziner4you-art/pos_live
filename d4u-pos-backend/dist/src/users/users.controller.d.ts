import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(store_id?: string): Promise<({
        store: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        } | null;
        role: {
            id: number;
            name: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        store_id: number | null;
        name: string;
        createdAt: Date;
        brand_id: number | null;
        image_url: string | null;
        phone: string;
        role_id: number;
        hashedPin: string;
        module_permissions: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    getRoles(): Promise<{
        id: number;
        name: string;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    createUser(body: {
        name: string;
        phone: string;
        pin: string;
        role_id: number;
        store_id?: number;
        brand_id?: number;
        image_url?: string;
        module_permissions?: Record<string, boolean>;
    }): Promise<{
        store: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        } | null;
        role: {
            id: number;
            name: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        store_id: number | null;
        name: string;
        createdAt: Date;
        brand_id: number | null;
        image_url: string | null;
        phone: string;
        role_id: number;
        hashedPin: string;
        module_permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateUser(id: number, body: {
        name?: string;
        phone?: string;
        pin?: string;
        role_id?: number;
        store_id?: number;
        image_url?: string;
        module_permissions?: Record<string, boolean>;
    }): Promise<{
        store: {
            id: number;
            name: string;
            createdAt: Date;
            location: string | null;
            is_online: boolean;
            brand_id: number;
            saas_package_id: number | null;
        } | null;
        role: {
            id: number;
            name: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        store_id: number | null;
        name: string;
        createdAt: Date;
        brand_id: number | null;
        image_url: string | null;
        phone: string;
        role_id: number;
        hashedPin: string;
        module_permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        store_id: number | null;
        name: string;
        createdAt: Date;
        brand_id: number | null;
        image_url: string | null;
        phone: string;
        role_id: number;
        hashedPin: string;
        module_permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    uploadFile(file: any): {
        url: string;
    };
}
