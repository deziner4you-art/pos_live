import { PrismaService } from '../prisma/prisma.service';
export declare class DealService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly SAFETY_THRESHOLD_PCT;
    calculateDealDiscount(product_id: number, quantity: number, requested_discount_pct: number): Promise<{
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
