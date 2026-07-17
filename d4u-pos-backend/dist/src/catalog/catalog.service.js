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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogService = class CatalogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncCatalogForPos(store_id) {
        const categories = await this.prisma.category.findMany({
            where: {
                OR: [
                    { store_id },
                    { assigned_stores: { some: { id: store_id } } },
                    { menu: { stores: { some: { id: store_id } } } }
                ]
            }
        });
        const products = await this.prisma.product.findMany({
            where: {
                is_active: true,
                status: 'APPROVED',
                OR: [
                    { store_id },
                    { assigned_stores: { some: { id: store_id } } },
                    { categories: { some: { assigned_stores: { some: { id: store_id } } } } },
                    { categories: { some: { menu: { stores: { some: { id: store_id } } } } } }
                ]
            },
            include: { categories: true, variants: true },
            orderBy: { id: 'asc' },
        });
        return { categories, products, synced_at: new Date().toISOString() };
    }
    async getMenus() {
        return this.prisma.menu.findMany({
            include: { stores: true, categories: true }
        });
    }
    async createMenu(data) {
        return this.prisma.menu.create({
            data: {
                name: data.name,
                brand_id: data.brand_id || 1,
                stores: {
                    connect: (data.store_ids || []).map(id => ({ id }))
                }
            },
            include: { stores: true }
        });
    }
    async updateMenu(id, data) {
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.store_ids !== undefined) {
            updateData.stores = { set: data.store_ids.map(sid => ({ id: sid })) };
        }
        return this.prisma.menu.update({
            where: { id },
            data: updateData,
            include: { stores: true }
        });
    }
    async duplicateMenu(id) {
        const original = await this.prisma.menu.findUnique({
            where: { id },
            include: {
                categories: {
                    include: { products: true }
                }
            }
        });
        if (!original)
            throw new common_1.NotFoundException('Menu not found');
        const newMenu = await this.prisma.menu.create({
            data: {
                name: `${original.name} (Copy)`,
                brand_id: original.brand_id,
                isActive: original.isActive,
            }
        });
        for (const category of original.categories) {
            const newCategory = await this.prisma.category.create({
                data: {
                    name: category.name,
                    store_id: category.store_id,
                    menu_id: newMenu.id
                }
            });
            for (const product of category.products) {
                await this.prisma.product.create({
                    data: {
                        name: product.name,
                        price: product.price,
                        cost: product.cost,
                        margin_pct: product.margin_pct,
                        is_active: product.is_active,
                        sku: product.sku,
                        image_url: product.image_url,
                        status: product.status,
                        store_id: product.store_id,
                        categories: { connect: [{ id: newCategory.id }] }
                    }
                });
            }
        }
        return newMenu;
    }
    async deleteMenu(id) {
        const categories = await this.prisma.category.findMany({
            where: { menu_id: id },
            include: { products: true }
        });
        const categoryIds = categories.map(c => c.id);
        const productIdsToDelete = new Set();
        for (const category of categories) {
            for (const product of category.products) {
                productIdsToDelete.add(product.id);
            }
        }
        if (productIdsToDelete.size > 0) {
            await this.prisma.product.deleteMany({
                where: { id: { in: Array.from(productIdsToDelete) } }
            });
        }
        if (categoryIds.length > 0) {
            await this.prisma.category.deleteMany({
                where: { id: { in: categoryIds } }
            });
        }
        return this.prisma.menu.delete({ where: { id } });
    }
    async getCategories(store_id) {
        return this.prisma.category.findMany({
            include: { menu: true, assigned_stores: true }
        });
    }
    async createCategory(store_id, name, menu_id, store_ids) {
        return this.prisma.category.create({
            data: {
                store_id,
                name,
                menu_id,
                assigned_stores: {
                    connect: (store_ids || []).map(id => ({ id }))
                }
            },
            include: { menu: true, assigned_stores: true }
        });
    }
    async updateCategory(id, data) {
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.menu_id !== undefined)
            updateData.menu_id = data.menu_id;
        if (data.store_ids !== undefined) {
            updateData.assigned_stores = { set: data.store_ids.map(sid => ({ id: sid })) };
        }
        return this.prisma.category.update({
            where: { id },
            data: updateData,
            include: { menu: true, assigned_stores: true }
        });
    }
    async deleteCategory(id) {
        return this.prisma.category.delete({ where: { id } });
    }
    async getProducts(store_id) {
        return this.prisma.product.findMany({
            where: { is_active: true },
            include: { categories: true, assigned_stores: true, variants: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async createProduct(data) {
        const { assigned_store_ids, category_ids, variants, ...productData } = data;
        return this.prisma.product.create({
            data: {
                ...productData,
                status: data.status || 'APPROVED',
                categories: {
                    connect: (category_ids || []).map(id => ({ id }))
                },
                assigned_stores: {
                    connect: (assigned_store_ids || []).map(id => ({ id }))
                },
                variants: variants && variants.length > 0 ? {
                    create: variants.map(v => ({ name: v.name, price: v.price }))
                } : undefined
            },
            include: { assigned_stores: true, categories: true, variants: true }
        });
    }
    async updateProduct(id, data) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Product #${id} not found`);
        const { assigned_store_ids, category_ids, variants, ...updateData } = data;
        const updatePayload = { ...updateData };
        if (assigned_store_ids !== undefined) {
            updatePayload.assigned_stores = { set: assigned_store_ids.map(sid => ({ id: sid })) };
        }
        if (category_ids !== undefined) {
            updatePayload.categories = { set: category_ids.map(cid => ({ id: cid })) };
        }
        if (variants !== undefined) {
            await this.prisma.productVariant.deleteMany({ where: { product_id: id } });
            if (variants.length > 0) {
                updatePayload.variants = {
                    create: variants.map(v => ({ name: v.name, price: v.price }))
                };
            }
        }
        return this.prisma.product.update({
            where: { id },
            data: updatePayload,
            include: { assigned_stores: true, categories: true, variants: true }
        });
    }
    async approveProduct(id) {
        return this.prisma.product.update({
            where: { id },
            data: { status: 'APPROVED' }
        });
    }
    async deleteProduct(id) {
        return this.prisma.product.update({
            where: { id },
            data: { is_active: false },
        });
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map