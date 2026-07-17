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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
let SocialService = class SocialService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFacebookPages(accessToken) {
        try {
            if (accessToken === 'dummy_token' || !accessToken) {
                return [
                    { id: '123', name: 'Masjid e Taqwa' },
                    { id: '124', name: 'IMSA Official' },
                    { id: '125', name: 'Main Branch' }
                ];
            }
            const res = await axios_1.default.get(`https://graph.facebook.com/me/accounts`, {
                params: { access_token: accessToken }
            });
            return res.data.data.map((page) => ({
                id: page.id,
                name: page.name
            }));
        }
        catch (err) {
            console.error('[Meta API] Failed to fetch pages:', err.message);
            return [];
        }
    }
    async saveFacebookPage(branchId, pageId, pageName, accessToken) {
        return this.prisma.branchSocialAccount.upsert({
            where: { branch_id: branchId },
            update: {
                facebook_page_id: pageId,
                facebook_page_name: pageName,
                is_facebook_connected: true,
                access_token: accessToken
            },
            create: {
                branch_id: branchId,
                facebook_page_id: pageId,
                facebook_page_name: pageName,
                is_facebook_connected: true,
                access_token: accessToken
            }
        });
    }
    async disconnectFacebook(branchId) {
        return this.prisma.branchSocialAccount.update({
            where: { branch_id: branchId },
            data: { facebook_page_id: null, facebook_page_name: null, is_facebook_connected: false }
        });
    }
    async getInstagramAccounts(accessToken) {
        try {
            if (accessToken === 'dummy_token' || !accessToken) {
                return [
                    { id: 'ig_123', username: '@masjidetaqwa' },
                    { id: 'ig_124', username: '@imsaofficial' }
                ];
            }
            return [];
        }
        catch (err) {
            console.error('[Meta API] Failed to fetch IG accounts:', err.message);
            return [];
        }
    }
    async saveInstagramAccount(branchId, igAccountId, igUsername, accessToken) {
        return this.prisma.branchSocialAccount.upsert({
            where: { branch_id: branchId },
            update: {
                instagram_user_id: igAccountId,
                instagram_username: igUsername,
                is_instagram_connected: true,
                access_token: accessToken
            },
            create: {
                branch_id: branchId,
                instagram_user_id: igAccountId,
                instagram_username: igUsername,
                is_instagram_connected: true,
                access_token: accessToken
            }
        });
    }
    async disconnectInstagram(branchId) {
        return this.prisma.branchSocialAccount.update({
            where: { branch_id: branchId },
            data: { instagram_user_id: null, instagram_username: null, is_instagram_connected: false }
        });
    }
    async getSocialStatus(branchId) {
        let account = await this.prisma.branchSocialAccount.findUnique({
            where: { branch_id: branchId }
        });
        if (!account) {
            account = { is_facebook_connected: false, is_instagram_connected: false };
        }
        return account;
    }
};
exports.SocialService = SocialService;
exports.SocialService = SocialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SocialService);
//# sourceMappingURL=social.service.js.map