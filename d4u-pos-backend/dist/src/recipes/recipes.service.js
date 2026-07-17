"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecipesService = class RecipesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRecipeForProduct(product_id) {
        return this.prisma.recipeIngredient.findMany({
            where: { product_id },
            include: { inventory: true },
        });
    }
    async addIngredientToRecipe(data) {
        const item = await this.prisma.recipeIngredient.create({
            data,
        });
        await this.recalculateProductCost(data.product_id);
        return item;
    }
    async removeIngredientFromRecipe(id) {
        const item = await this.prisma.recipeIngredient.delete({
            where: { id },
        });
        await this.recalculateProductCost(item.product_id);
        return item;
    }
    async saveRecipeBulk(product_id, ingredients) {
        return this.prisma.$transaction(async (tx) => {
            await tx.recipeIngredient.deleteMany({
                where: { product_id }
            });
            if (ingredients.length > 0) {
                await tx.recipeIngredient.createMany({
                    data: ingredients.map(i => ({
                        product_id,
                        inventory_id: i.inventory_id,
                        quantity: i.quantity,
                        unit: i.unit
                    }))
                });
            }
            return { success: true };
        }).then(async (res) => {
            await this.recalculateProductCost(product_id);
            return res;
        });
    }
    async recalculateProductCost(product_id) {
        const product = await this.prisma.product.findUnique({
            where: { id: product_id },
            include: { recipeItems: { include: { inventory: true } } },
        });
        if (!product)
            return;
        let totalCost = 0;
        for (const recipeItem of product.recipeItems) {
            const unitPrice = recipeItem.inventory?.unit_price || 0;
            totalCost += (unitPrice * recipeItem.quantity);
        }
        const margin_pct = product.price > 0 ? ((product.price - totalCost) / product.price) * 100 : 0;
        await this.prisma.product.update({
            where: { id: product_id },
            data: {
                cost: totalCost,
                margin_pct: margin_pct,
            }
        });
        return { totalCost, margin_pct };
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map