import { PrismaService } from '../prisma/prisma.service';
export declare class RecipesService {
    private prisma;
    constructor(prisma: PrismaService);
    getRecipeForProduct(product_id: number): Promise<({
        inventory: {
            id: number;
            store_id: number;
            name: string;
            quantity: number;
            unit: string;
            reorder_level: number;
            unit_price: number;
        };
    } & {
        id: number;
        quantity: number;
        unit: string;
        inventory_id: number;
        product_id: number;
    })[]>;
    addIngredientToRecipe(data: {
        product_id: number;
        inventory_id: number;
        quantity: number;
        unit: string;
    }): Promise<{
        id: number;
        quantity: number;
        unit: string;
        inventory_id: number;
        product_id: number;
    }>;
    removeIngredientFromRecipe(id: number): Promise<{
        id: number;
        quantity: number;
        unit: string;
        inventory_id: number;
        product_id: number;
    }>;
    saveRecipeBulk(product_id: number, ingredients: {
        inventory_id: number;
        quantity: number;
        unit: string;
    }[]): Promise<{
        success: boolean;
    }>;
    recalculateProductCost(product_id: number): Promise<{
        totalCost: number;
        margin_pct: number;
    } | undefined>;
}
