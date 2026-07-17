import { PrismaService } from '../prisma/prisma.service';
export declare class TerminalController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login(body: {
        pin: string;
    }): Promise<{
        success: boolean;
        message: string;
        waiter_name?: undefined;
        store_id?: undefined;
    } | {
        success: boolean;
        waiter_name: string;
        store_id: number;
        message?: undefined;
    }>;
    generatePin(body: {
        store_id: number;
        waiter_name: string;
    }): Promise<{
        success: boolean;
        pin: string;
    }>;
    killSession(pin: string): Promise<{
        success: boolean;
    }>;
}
