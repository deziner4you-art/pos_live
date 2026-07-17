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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionService = class SubscriptionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPricing() {
        const pricing = await this.prisma.saaSPricing.findMany();
        if (pricing.length === 0) {
            return [
                { module_key: 'BASE_POS', module_name: 'Base POS System', price_monthly: 50, currency: 'USD' },
                { module_key: 'KDS', module_name: 'Kitchen Display System', price_monthly: 15, currency: 'USD' },
                { module_key: 'RIDER', module_name: 'Delivery Rider App', price_monthly: 10, currency: 'USD' },
                { module_key: 'TV_BOARD', module_name: 'Customer TV Board', price_monthly: 10, currency: 'USD' },
                { module_key: 'ONLINE_WEBSITE', module_name: 'Online Ordering Website', price_monthly: 25, currency: 'USD' },
                { module_key: 'LOYALTY', module_name: 'Loyalty & Rewards', price_monthly: 5, currency: 'USD' },
                { module_key: 'ANALYTICS', module_name: 'Advanced Analytics (Owner App)', price_monthly: 20, currency: 'USD' },
            ];
        }
        return pricing;
    }
    async onboardClient(body) {
        const { brand_name, currency, vat_percentage, selected_modules, total_billing_amount, admin_user } = body;
        const brand = await this.prisma.brand.create({
            data: {
                name: brand_name,
                currency: currency || 'PKR',
                vat_percentage: vat_percentage || 0,
            }
        });
        const store = await this.prisma.store.create({
            data: {
                brand_id: brand.id,
                name: `${brand_name} - HQ`,
                location: 'Main Branch'
            }
        });
        const subscription = await this.prisma.subscription.create({
            data: {
                brand_id: brand.id,
                plan_name: 'CUSTOM_SAAS',
                module_auth_enabled: true,
                module_analytics_enabled: selected_modules.includes('ANALYTICS'),
                module_kds_enabled: selected_modules.includes('KDS'),
                module_riders_enabled: selected_modules.includes('RIDER'),
                module_tv_board_enabled: selected_modules.includes('TV_BOARD'),
                module_online_website_enabled: selected_modules.includes('ONLINE_WEBSITE'),
                module_loyalty_enabled: selected_modules.includes('LOYALTY'),
                billing_amount: total_billing_amount || 0,
                status: 'ACTIVE'
            }
        });
        if (admin_user) {
            await this.prisma.user.create({
                data: {
                    brand_id: brand.id,
                    store_id: store.id,
                    role_id: 1,
                    name: admin_user.name || 'Admin',
                    phone: admin_user.phone,
                    hashedPin: admin_user.password || '1234'
                }
            });
        }
        return { success: true, brand, store, subscription };
    }
    async createOrUpdateSubscription(body) {
        const { brand_id, plan_name, modules, is_chain_store, menu_strategy, currency, vat_percentage } = body;
        await this.prisma.brand.update({
            where: { id: Number(brand_id) },
            data: {
                is_chain_store: is_chain_store ?? false,
                menu_strategy: menu_strategy || 'UNIFIED',
                ...(currency && { currency }),
                ...(vat_percentage !== undefined && { vat_percentage })
            }
        });
        const existing = await this.prisma.subscription.findUnique({
            where: { brand_id: Number(brand_id) }
        });
        if (existing) {
            return this.prisma.subscription.update({
                where: { id: existing.id },
                data: {
                    plan_name,
                    ...modules
                }
            });
        }
        return this.prisma.subscription.create({
            data: {
                brand_id: Number(brand_id),
                plan_name,
                ...modules
            }
        });
    }
    async getSubscription(brand_id) {
        const sub = await this.prisma.subscription.findUnique({
            where: { brand_id },
            include: { brand: true }
        });
        if (!sub) {
            return {
                brand_id,
                plan_name: 'Free Trial',
                module_auth_enabled: true,
                module_kds_enabled: false,
                module_riders_enabled: false,
                module_loyalty_enabled: false,
                module_tv_board_enabled: false,
                module_online_website_enabled: false,
                module_analytics_enabled: true,
                billing_amount: 0,
                brand: { is_chain_store: false, menu_strategy: 'UNIFIED', currency: 'PKR', vat_percentage: 0 }
            };
        }
        return sub;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map