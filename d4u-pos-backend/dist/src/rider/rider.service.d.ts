import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../app.gateway';
export declare class RiderService {
    private prisma;
    private gateway;
    constructor(prisma: PrismaService, gateway: AppGateway);
    getRiderOrders(storeId?: string): Promise<{
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        customer: string;
        orderId: number | null;
        kdsStatus: string;
        type: string;
        source: string;
        customerPhone: string;
        customerAddress: string;
        items: string;
        totalAmount: string;
        notes: string;
        prepTimeMinutes: number;
        estimatedReadyAt: string;
        timePlaced: string;
        riderAssigned: boolean;
        feedback: import("@prisma/client/runtime/library").JsonValue | null;
        delivery: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    updateRiderGps(body: any): Promise<{
        success: boolean;
    }>;
    getRiderGps(orderId: string): Promise<string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray>;
    dispatchOrder(body: any): Promise<{
        success: boolean;
        order: any;
    }>;
    settleOrder(id: string): Promise<{
        success: boolean;
        order: {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            customer: string;
            orderId: number | null;
            kdsStatus: string;
            type: string;
            source: string;
            customerPhone: string;
            customerAddress: string;
            items: string;
            totalAmount: string;
            notes: string;
            prepTimeMinutes: number;
            estimatedReadyAt: string;
            timePlaced: string;
            riderAssigned: boolean;
            feedback: import("@prisma/client/runtime/library").JsonValue | null;
            delivery: import("@prisma/client/runtime/library").JsonValue | null;
        };
    }>;
}
