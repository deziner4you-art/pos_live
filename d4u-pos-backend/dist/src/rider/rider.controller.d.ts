import { RiderService } from './rider.service';
export declare class RiderController {
    private readonly service;
    constructor(service: RiderService);
    updateGps(body: any): Promise<{
        success: boolean;
    }>;
    getRiderGps(orderId: string): Promise<string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray>;
}
export declare class RiderOrdersController {
    private readonly service;
    constructor(service: RiderService);
    getRiderOrders(storeId: string): Promise<{
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
}
export declare class DispatchOrderController {
    private readonly service;
    constructor(service: RiderService);
    dispatchOrder(body: any): Promise<{
        success: boolean;
        order: any;
    }>;
}
export declare class SettleOrderController {
    private readonly service;
    constructor(service: RiderService);
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
