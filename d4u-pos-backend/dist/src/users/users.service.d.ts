import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<({
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
    getUsersByStore(store_id: number): Promise<({
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
    createUser(data: {
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
    updateUser(id: number, data: {
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
}
