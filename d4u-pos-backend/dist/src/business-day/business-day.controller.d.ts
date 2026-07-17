import { BusinessDayService } from './business-day.service';
export declare class BusinessDayController {
    private readonly service;
    constructor(service: BusinessDayService);
    getCurrentDay(store_id: string): Promise<({
        starter: {
            id: number;
            name: string;
            role: {
                id: number;
                name: string;
                permissions: import("@prisma/client/runtime/library").JsonValue;
            };
        };
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        notes: string | null;
        started_by: number;
        closed_by: number | null;
        dayStart: Date;
        dayClose: Date | null;
        openingFloat: number;
        closingCash: number | null;
        totalSales: number | null;
        totalOrders: number | null;
    }) | null> | {
        error: string;
    };
    getDayHistory(store_id: string, limit?: string): Promise<({
        starter: {
            id: number;
            name: string;
        };
        closer: {
            id: number;
            name: string;
        } | null;
    } & {
        status: string;
        id: number;
        store_id: number;
        createdAt: Date;
        notes: string | null;
        started_by: number;
        closed_by: number | null;
        dayStart: Date;
        dayClose: Date | null;
        openingFloat: number;
        closingCash: number | null;
        totalSales: number | null;
        totalOrders: number | null;
    })[]>;
    startDay(body: {
        store_id: number;
        started_by: number;
        openingFloat: number;
    }): Promise<{
        success: boolean;
        day: {
            starter: {
                id: number;
                name: string;
            };
        } & {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            notes: string | null;
            started_by: number;
            closed_by: number | null;
            dayStart: Date;
            dayClose: Date | null;
            openingFloat: number;
            closingCash: number | null;
            totalSales: number | null;
            totalOrders: number | null;
        };
    }>;
    closeDay(body: {
        store_id: number;
        closed_by: number;
        closingCash: number;
        notes?: string;
    }): Promise<{
        success: boolean;
        day: {
            status: string;
            id: number;
            store_id: number;
            createdAt: Date;
            notes: string | null;
            started_by: number;
            closed_by: number | null;
            dayStart: Date;
            dayClose: Date | null;
            openingFloat: number;
            closingCash: number | null;
            totalSales: number | null;
            totalOrders: number | null;
        };
        summary: {
            totalSales: number;
            totalOrders: number;
            expectedCash: number;
            closingCash: number;
            discrepancy: number;
        };
    }>;
}
