"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_gateway_1 = require("./app.gateway");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const inventory_module_1 = require("./inventory/inventory.module");
const deal_module_1 = require("./deal/deal.module");
const marketing_module_1 = require("./marketing/marketing.module");
const catalog_module_1 = require("./catalog/catalog.module");
const pos_orders_module_1 = require("./pos-orders/pos-orders.module");
const kots_module_1 = require("./kots/kots.module");
const business_day_module_1 = require("./business-day/business-day.module");
const cash_flow_module_1 = require("./cash-flow/cash-flow.module");
const customers_module_1 = require("./customers/customers.module");
const reports_module_1 = require("./reports/reports.module");
const online_orders_module_1 = require("./online-orders/online-orders.module");
const rider_module_1 = require("./rider/rider.module");
const vendor_module_1 = require("./vendor/vendor.module");
const cms_module_1 = require("./cms/cms.module");
const stores_module_1 = require("./stores/stores.module");
const recipes_module_1 = require("./recipes/recipes.module");
const subscription_module_1 = require("./subscription/subscription.module");
const users_module_1 = require("./users/users.module");
const saas_package_module_1 = require("./saas-package/saas-package.module");
const schedule_1 = require("@nestjs/schedule");
const terminal_module_1 = require("./terminal/terminal.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            catalog_module_1.CatalogModule,
            pos_orders_module_1.PosOrdersModule,
            kots_module_1.KotsModule,
            business_day_module_1.BusinessDayModule,
            cash_flow_module_1.CashFlowModule,
            customers_module_1.CustomersModule,
            inventory_module_1.InventoryModule,
            deal_module_1.DealModule,
            marketing_module_1.MarketingModule,
            reports_module_1.ReportsModule,
            online_orders_module_1.OnlineOrdersModule,
            rider_module_1.RiderModule,
            vendor_module_1.VendorModule,
            cms_module_1.CmsModule,
            stores_module_1.StoresModule,
            recipes_module_1.RecipesModule,
            subscription_module_1.SubscriptionModule,
            users_module_1.UsersModule,
            saas_package_module_1.SaasPackageModule,
            terminal_module_1.TerminalModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map