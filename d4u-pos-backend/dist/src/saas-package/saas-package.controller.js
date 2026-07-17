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
exports.SaasPackageController = void 0;
const common_1 = require("@nestjs/common");
const saas_package_service_1 = require("./saas-package.service");
let SaasPackageController = class SaasPackageController {
    saasPackageService;
    constructor(saasPackageService) {
        this.saasPackageService = saasPackageService;
    }
    create(body) {
        return this.saasPackageService.createPackage(body);
    }
    findAll() {
        return this.saasPackageService.getAllPackages();
    }
    findOne(id) {
        return this.saasPackageService.getPackage(+id);
    }
    update(id, body) {
        return this.saasPackageService.updatePackage(+id, body);
    }
    remove(id) {
        return this.saasPackageService.deletePackage(+id);
    }
};
exports.SaasPackageController = SaasPackageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SaasPackageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SaasPackageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasPackageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SaasPackageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasPackageController.prototype, "remove", null);
exports.SaasPackageController = SaasPackageController = __decorate([
    (0, common_1.Controller)('saas-package'),
    __metadata("design:paramtypes", [saas_package_service_1.SaasPackageService])
], SaasPackageController);
//# sourceMappingURL=saas-package.controller.js.map