"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const pos_orders_controller_1 = require("./pos-orders.controller");
const pos_orders_service_1 = require("./pos-orders.service");
const prisma_module_1 = require("../prisma/prisma.module");
const app_gateway_1 = require("../app.gateway");
const inventory_module_1 = require("../inventory/inventory.module");
const customers_module_1 = require("../customers/customers.module");
let PosOrdersModule = class PosOrdersModule {
};
exports.PosOrdersModule = PosOrdersModule;
exports.PosOrdersModule = PosOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, inventory_module_1.InventoryModule, customers_module_1.CustomersModule],
        controllers: [pos_orders_controller_1.PosOrdersController],
        providers: [pos_orders_service_1.PosOrdersService, app_gateway_1.AppGateway],
        exports: [pos_orders_service_1.PosOrdersService],
    })
], PosOrdersModule);
//# sourceMappingURL=pos-orders.module.js.map