"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KotsModule = void 0;
const common_1 = require("@nestjs/common");
const kots_controller_1 = require("./kots.controller");
const kots_service_1 = require("./kots.service");
const prisma_module_1 = require("../prisma/prisma.module");
const app_gateway_1 = require("../app.gateway");
let KotsModule = class KotsModule {
};
exports.KotsModule = KotsModule;
exports.KotsModule = KotsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [kots_controller_1.KotsController],
        providers: [kots_service_1.KotsService, app_gateway_1.AppGateway],
        exports: [kots_service_1.KotsService],
    })
], KotsModule);
//# sourceMappingURL=kots.module.js.map