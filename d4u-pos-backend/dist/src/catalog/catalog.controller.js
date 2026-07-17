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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const catalog_service_1 = require("./catalog.service");
let CatalogController = class CatalogController {
    service;
    constructor(service) {
        this.service = service;
    }
    syncCatalog(store_id) {
        console.log(`[CATALOG SYNC] Store: ${store_id}`);
        return this.service.syncCatalogForPos(Number(store_id));
    }
    uploadImage(file) {
        if (!file)
            return { imageUrl: null };
        return { imageUrl: `/uploads/${file.filename}` };
    }
    getMenus() {
        return this.service.getMenus();
    }
    createMenu(body) {
        console.log(`[NEW MENU] ${body.name}`);
        return this.service.createMenu(body);
    }
    updateMenu(id, body) {
        console.log(`[UPDATE MENU] #${id}`);
        return this.service.updateMenu(Number(id), body);
    }
    duplicateMenu(id) {
        console.log(`[DUPLICATE MENU] #${id}`);
        return this.service.duplicateMenu(Number(id));
    }
    deleteMenu(id) {
        console.log(`[DELETE MENU] #${id}`);
        return this.service.deleteMenu(Number(id));
    }
    getCategories(store_id) {
        return this.service.getCategories(Number(store_id));
    }
    createCategory(body) {
        console.log(`[NEW CATEGORY] ${body.name}`);
        return this.service.createCategory(body.store_id, body.name, body.menu_id, body.store_ids);
    }
    updateCategory(id, body) {
        console.log(`[UPDATE CATEGORY] #${id}`);
        return this.service.updateCategory(Number(id), body);
    }
    deleteCategory(id) {
        console.log(`[DELETE CATEGORY] #${id}`);
        return this.service.deleteCategory(Number(id));
    }
    getProducts(store_id) {
        return this.service.getProducts(Number(store_id));
    }
    createProduct(body) {
        console.log(`[NEW PRODUCT] ${body.name} — Rs.${body.price}`);
        return this.service.createProduct(body);
    }
    updateProduct(id, body) {
        console.log(`[UPDATE PRODUCT] #${id}`);
        return this.service.updateProduct(Number(id), body);
    }
    approveProduct(id) {
        console.log(`[APPROVE PRODUCT] #${id}`);
        return this.service.approveProduct(Number(id));
    }
    deleteProduct(id) {
        console.log(`[DELETE PRODUCT] #${id}`);
        return this.service.deleteProduct(Number(id));
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)('sync/:store_id'),
    __param(0, (0, common_1.Param)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "syncCatalog", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('menus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getMenus", null);
__decorate([
    (0, common_1.Post)('menus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Patch)('menus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Post)('menus/:id/duplicate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "duplicateMenu", null);
__decorate([
    (0, common_1.Delete)('menus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "deleteMenu", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Patch)('products/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "approveProduct", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "deleteProduct", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)('catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map