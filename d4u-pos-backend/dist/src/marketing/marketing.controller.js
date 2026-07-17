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
exports.MarketingController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const marketing_service_1 = require("./marketing.service");
let MarketingController = class MarketingController {
    marketingService;
    constructor(marketingService) {
        this.marketingService = marketingService;
    }
    calculateSla(body) {
        return this.marketingService.calculateSlaPerformance(body.agency, body.target, body.achieved, body.retainer);
    }
    generateLink(body) {
        return this.marketingService.generateAffiliateLink(body.affiliate_id, body.store_id, body.platform);
    }
    createCampaign(file, body) {
        if (file)
            body.image_url = `/uploads/${file.filename}`;
        return this.marketingService.createCampaign(body);
    }
    getCampaigns(store_id) {
        return this.marketingService.getCampaigns(store_id ? parseInt(store_id, 10) : undefined);
    }
    updateCampaign(id, file, body) {
        if (file)
            body.image_url = `/uploads/${file.filename}`;
        return this.marketingService.updateCampaign(parseInt(id), body);
    }
    deleteCampaign(id) {
        return this.marketingService.deleteCampaign(parseInt(id));
    }
    createScheduledDiscount(file, body) {
        if (file)
            body.image_url = `/uploads/${file.filename}`;
        return this.marketingService.createScheduledDiscount(body);
    }
    getScheduledDiscounts() {
        return this.marketingService.getScheduledDiscounts();
    }
    updateScheduledDiscount(id, file, body) {
        if (file)
            body.image_url = `/uploads/${file.filename}`;
        return this.marketingService.updateScheduledDiscount(parseInt(id), body);
    }
    deleteScheduledDiscount(id) {
        return this.marketingService.deleteScheduledDiscount(parseInt(id));
    }
};
exports.MarketingController = MarketingController;
__decorate([
    (0, common_1.Post)('sla-performance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "calculateSla", null);
__decorate([
    (0, common_1.Post)('generate-affiliate-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "generateLink", null);
__decorate([
    (0, common_1.Post)('campaign'),
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
], MarketingController.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Get)('campaign'),
    __param(0, (0, common_1.Query)('store_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "getCampaigns", null);
__decorate([
    (0, common_1.Patch)('campaign/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "updateCampaign", null);
__decorate([
    (0, common_1.Delete)('campaign/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "deleteCampaign", null);
__decorate([
    (0, common_1.Post)('schedule'),
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
], MarketingController.prototype, "createScheduledDiscount", null);
__decorate([
    (0, common_1.Get)('schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "getScheduledDiscounts", null);
__decorate([
    (0, common_1.Patch)('schedule/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "updateScheduledDiscount", null);
__decorate([
    (0, common_1.Delete)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "deleteScheduledDiscount", null);
exports.MarketingController = MarketingController = __decorate([
    (0, common_1.Controller)('marketing'),
    __metadata("design:paramtypes", [marketing_service_1.MarketingService])
], MarketingController);
//# sourceMappingURL=marketing.controller.js.map