import { DealService } from './deal.service';
export declare class DealController {
    private readonly dealService;
    constructor(dealService: DealService);
    calculateDeal(body: {
        product_id: number;
        quantity: number;
        requested_discount_pct: number;
    }): Promise<{
        allowed: boolean;
        reason: string;
        message: string;
        original_price?: undefined;
        discounted_price?: undefined;
        final_margin_pct?: undefined;
    } | {
        allowed: boolean;
        original_price: number;
        discounted_price: number;
        final_margin_pct: number;
        reason?: undefined;
        message?: undefined;
    }>;
}
