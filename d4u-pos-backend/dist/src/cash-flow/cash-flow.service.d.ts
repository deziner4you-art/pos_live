import { PrismaService } from '../prisma/prisma.service';
export declare class CashFlowService {
    private prisma;
    constructor(prisma: PrismaService);
    cashIn(body: {
        store_id: any;
        user_id: any;
        amount: any;
        comment?: string;
    }): Promise<{
        success: boolean;
        record: {
            user: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            store_id: number;
            createdAt: Date;
            type: string;
            business_day_id: number;
            amount: number;
            comment: string | null;
            user_id: number;
        };
    }>;
    cashOut(body: {
        store_id: any;
        user_id: any;
        amount: any;
        comment?: string;
    }): Promise<{
        success: boolean;
        record: {
            user: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            store_id: number;
            createdAt: Date;
            type: string;
            business_day_id: number;
            amount: number;
            comment: string | null;
            user_id: number;
        };
    }>;
    getCashFlowByDay(store_id: number, business_day_id?: number): Promise<({
        user: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        store_id: number;
        createdAt: Date;
        type: string;
        business_day_id: number;
        amount: number;
        comment: string | null;
        user_id: number;
    })[]>;
    getCashSummary(store_id: number): Promise<{
        cashIn: number;
        cashOut: number;
        netCash: number;
        business_day_id?: undefined;
    } | {
        business_day_id: number;
        cashIn: number;
        cashOut: number;
        netCash: number;
    }>;
}
