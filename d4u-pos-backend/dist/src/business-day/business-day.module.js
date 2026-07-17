"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessDayModule = void 0;
const common_1 = require("@nestjs/common");
const business_day_controller_1 = require("./business-day.controller");
const business_day_service_1 = require("./business-day.service");
const prisma_module_1 = require("../prisma/prisma.module");
let BusinessDayModule = class BusinessDayModule {
};
exports.BusinessDayModule = BusinessDayModule;
exports.BusinessDayModule = BusinessDayModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [business_day_controller_1.BusinessDayController],
        providers: [business_day_service_1.BusinessDayService],
        exports: [business_day_service_1.BusinessDayService],
    })
], BusinessDayModule);
//# sourceMappingURL=business-day.module.js.map