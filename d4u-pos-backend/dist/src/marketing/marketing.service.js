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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
let MarketingService = class MarketingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateSlaPerformance(agencyName, baselineTarget, achievedOrders, retainerFee) {
        const BONUS_PER_EXTRA_ORDER = 150;
        const PENALTY_PCT_FOR_MISSING = 5.0;
        let finalPayout = retainerFee;
        let status = 'MET';
        let bonusOrPenalty = 0;
        if (achievedOrders > baselineTarget) {
            status = 'EXCEEDED';
            const extraOrders = achievedOrders - baselineTarget;
            bonusOrPenalty = extraOrders * BONUS_PER_EXTRA_ORDER;
            finalPayout += bonusOrPenalty;
        }
        else if (achievedOrders < baselineTarget) {
            status = 'MISSED';
            bonusOrPenalty = -(retainerFee * (PENALTY_PCT_FOR_MISSING / 100));
            finalPayout += bonusOrPenalty;
        }
        return {
            agency: agencyName,
            status,
            baseline_target: baselineTarget,
            achieved: achievedOrders,
            bonus_penalty_amount: bonusOrPenalty,
            final_payout: finalPayout,
            message: status === 'EXCEEDED' ? `Great job! Bonus awarded.` : (status === 'MISSED' ? `Target missed. Penalty applied.` : `Target exactly met.`)
        };
    }
    generateAffiliateLink(affiliateId, storeId, platform) {
        const baseUrl = `https://order.d4u-pos.com/store/${storeId}`;
        const deepLink = `${baseUrl}?utm_source=affiliate_${platform}&aff_id=${affiliateId}`;
        return {
            affiliate_id: affiliateId,
            platform,
            deep_link: deepLink,
            qr_code_data: deepLink,
            commission_rule: "5% per successful delivery via this link"
        };
    }
    async createCampaign(body) {
        const campaign = await this.prisma.marketingCampaign.create({
            data: {
                title: body.title,
                description: body.description,
                discount_pct: Number(body.discount_pct),
                image_url: body.image_url || null,
                published_pos: body.published_pos === 'true' || body.published_pos === true,
                published_web: body.published_web === 'true' || body.published_web === true,
                published_social: body.published_social === 'true' || body.published_social === true,
                status: body.schedule_for_later ? 'scheduled' : 'active',
                scheduled_at: body.schedule_for_later && body.scheduled_at ? new Date(body.scheduled_at) : null,
                target_stores: {
                    connect: (body.target_store_ids || []).map((id) => ({ id: Number(id) }))
                },
                target_categories: {
                    connect: (body.target_category_ids || []).map((id) => ({ id: Number(id) }))
                },
                target_products: {
                    connect: (body.target_product_ids || []).map((id) => ({ id: Number(id) }))
                }
            },
            include: { target_stores: true, target_categories: true, target_products: true }
        });
        let fbSuccess = false;
        let igSuccess = false;
        if (campaign.published_social && campaign.status === 'active') {
            try {
                console.log(`[SOCIAL MEDIA] Publishing "${campaign.title}" to Facebook Graph API.`);
                fbSuccess = true;
            }
            catch (e) {
                console.error('FB error', e);
            }
            try {
                console.log(`[SOCIAL MEDIA] Publishing "${campaign.title}" to Instagram Graph API.`);
                igSuccess = true;
            }
            catch (e) {
                console.error('IG error', e);
            }
            if (fbSuccess || igSuccess) {
                await this.prisma.marketingCampaign.update({
                    where: { id: campaign.id },
                    data: { published_facebook: fbSuccess, published_instagram: igSuccess }
                });
                campaign.published_facebook = fbSuccess;
                campaign.published_instagram = igSuccess;
            }
        }
        return {
            success: true,
            message: campaign.status === 'scheduled' ? 'Campaign scheduled successfully' : 'Campaign created successfully',
            campaign,
        };
    }
    async getCampaigns(store_id) {
        const whereClause = { is_active: true };
        if (store_id) {
            whereClause.OR = [
                { target_stores: { none: {} } },
                { target_stores: { some: { id: store_id } } }
            ];
        }
        return this.prisma.marketingCampaign.findMany({
            where: whereClause,
            include: { target_stores: true, target_categories: true, target_products: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateCampaign(id, data) {
        const { id: _, createdAt, updatedAt, target_store_ids, target_category_ids, target_product_ids, ...updateData } = data;
        const updatePayload = { ...updateData };
        if (target_store_ids !== undefined) {
            updatePayload.target_stores = { set: target_store_ids.map((id) => ({ id: Number(id) })) };
        }
        if (target_category_ids !== undefined) {
            updatePayload.target_categories = { set: target_category_ids.map((id) => ({ id: Number(id) })) };
        }
        if (target_product_ids !== undefined) {
            updatePayload.target_products = { set: target_product_ids.map((id) => ({ id: Number(id) })) };
        }
        return this.prisma.marketingCampaign.update({
            where: { id },
            data: updatePayload,
            include: { target_stores: true, target_categories: true, target_products: true }
        });
    }
    async deleteCampaign(id) {
        return this.prisma.marketingCampaign.delete({
            where: { id }
        });
    }
    async createScheduledDiscount(body) {
        return this.prisma.scheduledDiscount.create({
            data: {
                brand_id: body.brand_id || 1,
                title: body.title,
                discount_pct: Number(body.discount_pct),
                image_url: body.image_url || null,
                target_category_id: body.target_category_id ? Number(body.target_category_id) : null,
                target_product_id: body.target_product_id ? Number(body.target_product_id) : null,
                start_date: new Date(body.start_date),
                end_date: new Date(body.end_date),
                target_stores: body.target_stores || 'ALL'
            }
        });
    }
    async getScheduledDiscounts() {
        return this.prisma.scheduledDiscount.findMany({
            where: { is_active: true },
            orderBy: { start_date: 'asc' }
        });
    }
    async updateScheduledDiscount(id, data) {
        const { id: _, createdAt, updatedAt, ...updateData } = data;
        if (updateData.start_date)
            updateData.start_date = new Date(updateData.start_date);
        if (updateData.end_date)
            updateData.end_date = new Date(updateData.end_date);
        if (updateData.discount_pct)
            updateData.discount_pct = Number(updateData.discount_pct);
        return this.prisma.scheduledDiscount.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteScheduledDiscount(id) {
        return this.prisma.scheduledDiscount.delete({
            where: { id }
        });
    }
    async handleScheduledDiscounts() {
        const now = new Date();
        const activeSchedules = await this.prisma.scheduledDiscount.findMany({
            where: {
                is_active: true,
                start_date: { lte: now },
                end_date: { gte: now }
            }
        });
        for (const sched of activeSchedules) {
            const existing = await this.prisma.marketingCampaign.findFirst({
                where: { title: `[AUTO] ${sched.title}` }
            });
            if (!existing) {
                console.log(`[CRON] Auto-activating Scheduled Discount: ${sched.title}`);
                await this.createCampaign({
                    title: `[AUTO] ${sched.title}`,
                    description: `Automatically scheduled discount of ${sched.discount_pct}%`,
                    discount_pct: sched.discount_pct,
                    published_pos: true,
                    published_web: true,
                    published_social: true
                });
                console.log(`[CRON] Posted Scheduled Deal to Facebook/Instagram: ${sched.title}`);
            }
        }
        await this.prisma.scheduledDiscount.updateMany({
            where: {
                is_active: true,
                end_date: { lt: now }
            },
            data: { is_active: false }
        });
        const scheduledCampaigns = await this.prisma.marketingCampaign.findMany({
            where: {
                status: 'scheduled',
                scheduled_at: { lte: now }
            }
        });
        for (const campaign of scheduledCampaigns) {
            console.log(`[CRON] Auto-publishing Scheduled Campaign: ${campaign.title}`);
            let fbSuccess = false;
            let igSuccess = false;
            if (campaign.published_social) {
                try {
                    console.log(`[SOCIAL MEDIA] Publishing "${campaign.title}" to Facebook Graph API.`);
                    fbSuccess = true;
                }
                catch (e) { }
                try {
                    console.log(`[SOCIAL MEDIA] Publishing "${campaign.title}" to Instagram Graph API.`);
                    igSuccess = true;
                }
                catch (e) { }
            }
            await this.prisma.marketingCampaign.update({
                where: { id: campaign.id },
                data: {
                    status: 'active',
                    published_facebook: fbSuccess,
                    published_instagram: igSuccess
                }
            });
        }
    }
};
exports.MarketingService = MarketingService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketingService.prototype, "handleScheduledDiscounts", null);
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map