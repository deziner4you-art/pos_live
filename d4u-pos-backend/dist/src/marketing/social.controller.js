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
exports.SocialController = void 0;
const common_1 = require("@nestjs/common");
const social_service_1 = require("./social.service");
let SocialController = class SocialController {
    socialService;
    constructor(socialService) {
        this.socialService = socialService;
    }
    async getStatus(branchId) {
        if (!branchId)
            return {};
        return this.socialService.getSocialStatus(parseInt(branchId, 10));
    }
    async connectFacebook(branchId, res) {
        const state = JSON.stringify({ branchId, platform: 'facebook' });
        const redirectUri = process.env.META_REDIRECT_URI || 'http://localhost:3000/api/marketing/social/meta/callback';
        const clientId = process.env.META_APP_ID || 'dummy_client_id';
        if (clientId === 'dummy_client_id') {
            return res.redirect(`http://localhost:3001/api/marketing/social/meta/callback?code=dummy_code&state=${encodeURIComponent(state)}`);
        }
        const authUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${encodeURIComponent(state)}&scope=pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish`;
        return res.redirect(authUrl);
    }
    async connectInstagram(branchId, res) {
        const state = JSON.stringify({ branchId, platform: 'instagram' });
        const redirectUri = process.env.META_REDIRECT_URI || 'http://localhost:3000/api/marketing/social/meta/callback';
        const clientId = process.env.META_APP_ID || 'dummy_client_id';
        if (clientId === 'dummy_client_id') {
            return res.redirect(`http://localhost:3001/api/marketing/social/meta/callback?code=dummy_code&state=${encodeURIComponent(state)}`);
        }
        const authUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${encodeURIComponent(state)}&scope=pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish`;
        return res.redirect(authUrl);
    }
    async metaCallback(code, stateParam, res) {
        const state = JSON.parse(decodeURIComponent(stateParam || '{}'));
        const branchId = state.branchId;
        const platform = state.platform;
        const accessToken = 'dummy_token';
        return res.redirect(`http://localhost:5300/marketing-hub?oauth=success&platform=${platform}&branchId=${branchId}&token=${accessToken}`);
    }
    async getFacebookPages(token) {
        return this.socialService.getFacebookPages(token);
    }
    async selectFacebookPage(body) {
        return this.socialService.saveFacebookPage(parseInt(body.branchId, 10), body.pageId, body.pageName, body.token);
    }
    async disconnectFacebook(branchId) {
        return this.socialService.disconnectFacebook(parseInt(branchId, 10));
    }
    async getInstagramAccounts(token) {
        return this.socialService.getInstagramAccounts(token);
    }
    async selectInstagramAccount(body) {
        return this.socialService.saveInstagramAccount(parseInt(body.branchId, 10), body.accountId, body.username, body.token);
    }
    async disconnectInstagram(branchId) {
        return this.socialService.disconnectInstagram(parseInt(branchId, 10));
    }
};
exports.SocialController = SocialController;
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('facebook/connect'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "connectFacebook", null);
__decorate([
    (0, common_1.Get)('instagram/connect'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "connectInstagram", null);
__decorate([
    (0, common_1.Get)('meta/callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "metaCallback", null);
__decorate([
    (0, common_1.Get)('facebook/pages'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "getFacebookPages", null);
__decorate([
    (0, common_1.Post)('facebook/select'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "selectFacebookPage", null);
__decorate([
    (0, common_1.Delete)('facebook/disconnect'),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "disconnectFacebook", null);
__decorate([
    (0, common_1.Get)('instagram/accounts'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "getInstagramAccounts", null);
__decorate([
    (0, common_1.Post)('instagram/select'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "selectInstagramAccount", null);
__decorate([
    (0, common_1.Delete)('instagram/disconnect'),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "disconnectInstagram", null);
exports.SocialController = SocialController = __decorate([
    (0, common_1.Controller)('marketing/social'),
    __metadata("design:paramtypes", [social_service_1.SocialService])
], SocialController);
//# sourceMappingURL=social.controller.js.map