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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StoresService = class StoresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllStores() {
        return this.prisma.store.findMany({
            include: { brand: true, saas_package: true },
            orderBy: { id: 'asc' },
        });
    }
    async getStore(id) {
        const store = await this.prisma.store.findUnique({
            where: { id },
            include: { brand: true, saas_package: true },
        });
        if (!store)
            throw new common_1.NotFoundException(`Store #${id} not found`);
        return store;
    }
    async createStore(data) {
        return this.prisma.store.create({
            data: {
                name: data.name,
                brand_id: data.brand_id,
                location: data.location,
                is_online: data.is_online ?? true,
                saas_package_id: data.saas_package_id,
            },
        });
    }
    async updateStore(id, data) {
        return this.prisma.store.update({
            where: { id },
            data,
        });
    }
    async deleteStore(id) {
        return this.prisma.store.delete({
            where: { id },
        });
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoresService);
//# sourceMappingURL=stores.service.js.map