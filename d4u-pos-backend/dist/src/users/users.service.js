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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers() {
        return this.prisma.user.findMany({
            include: { role: true, store: true },
            orderBy: { id: 'asc' }
        });
    }
    async getUsersByStore(store_id) {
        return this.prisma.user.findMany({
            where: { store_id },
            include: { role: true, store: true }
        });
    }
    async getRoles() {
        return this.prisma.role.findMany({ orderBy: { id: 'asc' } });
    }
    async createUser(data) {
        if (data.role_id === 0) {
            let riderRole = await this.prisma.role.findFirst({ where: { name: 'Rider' } });
            if (!riderRole) {
                riderRole = await this.prisma.role.create({ data: { id: 11, name: 'Rider', permissions: {} } });
            }
            data.role_id = riderRole.id;
        }
        const existing = await this.prisma.user.findUnique({ where: { phone: data.phone } });
        if (existing)
            throw new common_1.BadRequestException(`Phone ${data.phone} is already registered`);
        return this.prisma.user.create({
            data: {
                name: data.name,
                phone: data.phone,
                hashedPin: data.pin || '1234',
                role_id: data.role_id,
                store_id: data.store_id || null,
                brand_id: data.brand_id || 1,
                image_url: data.image_url || null,
                module_permissions: data.module_permissions || {},
                rider_details: data.rider_details || null,
            },
            include: { role: true, store: true }
        });
    }
    async updateUser(id, data) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`User #${id} not found`);
        if (data.role_id === 0) {
            let riderRole = await this.prisma.role.findFirst({ where: { name: 'Rider' } });
            if (!riderRole) {
                riderRole = await this.prisma.role.create({ data: { id: 11, name: 'Rider', permissions: {} } });
            }
            data.role_id = riderRole.id;
        }
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.phone !== undefined)
            updateData.phone = data.phone;
        if (data.pin !== undefined)
            updateData.hashedPin = data.pin;
        if (data.role_id !== undefined)
            updateData.role_id = data.role_id;
        if (data.store_id !== undefined)
            updateData.store_id = data.store_id || null;
        if (data.image_url !== undefined)
            updateData.image_url = data.image_url;
        if (data.module_permissions !== undefined)
            updateData.module_permissions = data.module_permissions;
        if (data.rider_details !== undefined)
            updateData.rider_details = data.rider_details;
        return this.prisma.user.update({
            where: { id },
            data: updateData,
            include: { role: true, store: true }
        });
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`User #${id} not found`);
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map