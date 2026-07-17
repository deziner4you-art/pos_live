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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CmsService = class CmsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBanners(brand_id = 1) {
        return this.prisma.cmsBanner.findMany({
            where: { brand_id },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async createBanner(data) {
        return this.prisma.cmsBanner.create({
            data: {
                brand_id: data.brand_id || 1,
                title: data.title,
                subtitle: data.subtitle,
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                buttonText: data.buttonText,
                isActive: data.isActive ?? true,
                displayOrder: data.displayOrder || 0,
            }
        });
    }
    async updateBanner(id, data) {
        return this.prisma.cmsBanner.update({
            where: { id },
            data,
        });
    }
    async deleteBanner(id) {
        return this.prisma.cmsBanner.delete({
            where: { id }
        });
    }
    async getSettings(store_id) {
        let settings = await this.prisma.cmsSettings.findFirst({
            where: { store_id },
            include: { brand: true, store: true }
        });
        if (!settings) {
            settings = await this.prisma.cmsSettings.create({
                data: { brand_id: 1, store_id, siteTitle: 'D4U Restaurant' },
                include: { brand: true, store: true }
            });
        }
        return settings;
    }
    async updateSettings(store_id, data) {
        const existing = await this.getSettings(store_id);
        return this.prisma.cmsSettings.update({
            where: { id: existing.id },
            data: {
                siteTitle: data.siteTitle,
                contactPhone: data.contactPhone,
                contactEmail: data.contactEmail,
                address: data.address,
                googleMapUrl: data.googleMapUrl,
                facebookUrl: data.facebookUrl,
                instagramUrl: data.instagramUrl,
                whatsappNumber: data.whatsappNumber,
                twitterUrl: data.twitterUrl,
                youtubeUrl: data.youtubeUrl,
                aboutText: data.aboutText,
                companyText: data.companyText,
                module_auth_enabled: data.module_auth_enabled,
                module_kds_enabled: data.module_kds_enabled,
                module_loyalty_enabled: data.module_loyalty_enabled,
                module_payments_enabled: data.module_payments_enabled,
            }
        });
    }
    async subscribeNewsletter(store_id, email) {
        try {
            return await this.prisma.newsletterSubscriber.create({
                data: { store_id, email }
            });
        }
        catch (error) {
            return { status: 'already_subscribed' };
        }
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CmsService);
//# sourceMappingURL=cms.service.js.map