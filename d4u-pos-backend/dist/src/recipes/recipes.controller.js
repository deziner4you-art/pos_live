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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
let RecipesController = class RecipesController {
    recipesService;
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    getRecipe(productId) {
        return this.recipesService.getRecipeForProduct(productId);
    }
    addIngredient(body) {
        return this.recipesService.addIngredientToRecipe(body);
    }
    saveBulk(productId, body) {
        return this.recipesService.saveRecipeBulk(productId, body.ingredients);
    }
    removeIngredient(id) {
        return this.recipesService.removeIngredientFromRecipe(id);
    }
    recalculateCost(productId) {
        return this.recipesService.recalculateProductCost(productId);
    }
};
exports.RecipesController = RecipesController;
__decorate([
    (0, common_1.Get)('product/:product_id'),
    __param(0, (0, common_1.Param)('product_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "addIngredient", null);
__decorate([
    (0, common_1.Post)('bulk/:product_id'),
    __param(0, (0, common_1.Param)('product_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "saveBulk", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "removeIngredient", null);
__decorate([
    (0, common_1.Post)('recalculate/:product_id'),
    __param(0, (0, common_1.Param)('product_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "recalculateCost", null);
exports.RecipesController = RecipesController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
//# sourceMappingURL=recipes.controller.js.map