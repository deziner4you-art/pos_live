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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const cms_service_1 = require("./cms.service");
let CmsController = class CmsController {
    cmsService;
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    getBannersByBrand(brandId) {
        return this.cmsService.getBanners(parseInt(brandId));
    }
    getBanners() {
        return this.cmsService.getBanners(1);
    }
    createBanner(file, body) {
        const imageUrl = file ? `/uploads/${file.filename}` : body.imageUrl;
        return this.cmsService.createBanner({
            brand_id: body.brand_id ? parseInt(body.brand_id) : 1,
            title: body.title,
            subtitle: body.subtitle,
            imageUrl: imageUrl,
            linkUrl: body.linkUrl,
            buttonText: body.buttonText,
            isActive: body.isActive === 'true' || body.isActive === true,
            displayOrder: body.displayOrder ? parseInt(body.displayOrder) : 0,
        });
    }
    updateBanner(id, body) {
        return this.cmsService.updateBanner(id, body);
    }
    deleteBanner(id) {
        return this.cmsService.deleteBanner(id);
    }
    getSettingsByStore(storeId) {
        return this.cmsService.getSettings(parseInt(storeId));
    }
    getSettings() {
        return this.cmsService.getSettings(1);
    }
    updateSettings(storeId, body) {
        return this.cmsService.updateSettings(storeId, body);
    }
    subscribe(body) {
        return this.cmsService.subscribeNewsletter(body.store_id, body.email);
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('banners/:brand_id'),
    __param(0, (0, common_1.Param)('brand_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getBannersByBrand", null);
__decorate([
    (0, common_1.Get)('banners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getBanners", null);
__decorate([
    (0, common_1.Post)('banners'),
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
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Patch)('banners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Delete)('banners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "deleteBanner", null);
__decorate([
    (0, common_1.Get)('settings/:store_id'),
    __param(0, (0, common_1.Param)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getSettingsByStore", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Patch)('settings/:storeId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "subscribe", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map