import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    getRecipe(productId: number): Promise<({
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
    addIngredient(body: {
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
    saveBulk(productId: number, body: {
        ingredients: {
            inventory_id: number;
            quantity: number;
            unit: string;
        }[];
    }): Promise<{
        success: boolean;
    }>;
    removeIngredient(id: number): Promise<{
        id: number;
        quantity: number;
        unit: string;
        inventory_id: number;
        product_id: number;
    }>;
    recalculateCost(productId: number): Promise<{
        totalCost: number;
        margin_pct: number;
    } | undefined>;
}
