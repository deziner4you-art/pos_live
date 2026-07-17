import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        phone: string;
        pin: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            role: string;
            role_id: number;
            store_id: number | null;
            store: {
                name: string | undefined;
            };
            module_permissions: import("@prisma/client/runtime/library").JsonValue;
        };
    }>;
    getOfflineCredentials(storeId: number): Promise<{
        id: number;
        role: {
            name: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
        phone: string;
        hashedPin: string;
    }[]>;
}
