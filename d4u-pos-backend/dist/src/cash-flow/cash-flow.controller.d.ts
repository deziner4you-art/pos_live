import { CashFlowService } from './cash-flow.service';
export declare class CashFlowController {
    private readonly service;
    constructor(service: CashFlowService);
    getCashFlow(store_id: string, business_day_id?: string): Promise<({
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
    getSummary(store_id: string): Promise<{
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
    cashIn(body: {
        store_id: number;
        user_id: number;
        amount: number;
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
        store_id: number;
        user_id: number;
        amount: number;
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
}
