import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(phone: string, pin: string): Promise<{
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
    getOfflineCredentials(store_id: number): Promise<{
        id: number;
        role: {
            name: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
        phone: string;
        hashedPin: string;
    }[]>;
}
