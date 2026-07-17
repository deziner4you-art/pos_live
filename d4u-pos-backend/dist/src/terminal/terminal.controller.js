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
exports.TerminalController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TerminalController = class TerminalController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(body) {
        const session = await this.prisma.terminalSession.findUnique({
            where: { pin: body.pin }
        });
        if (!session || !session.is_active) {
            return { success: false, message: 'Invalid or expired PIN' };
        }
        return {
            success: true,
            waiter_name: session.waiter_name,
            store_id: session.store_id
        };
    }
    async generatePin(body) {
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        await this.prisma.terminalSession.create({
            data: {
                store_id: body.store_id,
                waiter_name: body.waiter_name,
                pin,
                is_active: true
            }
        });
        return { success: true, pin };
    }
    async killSession(pin) {
        await this.prisma.terminalSession.delete({
            where: { pin }
        }).catch(() => null);
        return { success: true };
    }
};
exports.TerminalController = TerminalController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TerminalController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TerminalController.prototype, "generatePin", null);
__decorate([
    (0, common_1.Delete)(':pin'),
    __param(0, (0, common_1.Param)('pin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TerminalController.prototype, "killSession", null);
exports.TerminalController = TerminalController = __decorate([
    (0, common_1.Controller)('terminal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TerminalController);
//# sourceMappingURL=terminal.controller.js.map