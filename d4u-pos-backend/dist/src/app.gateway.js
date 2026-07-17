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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AppGateway = class AppGateway {
    server;
    activeWaiterPins = {};
    activeWaiters = {};
    handleConnection(client) {
        console.log(`[SOCKET] Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`[SOCKET] Client disconnected: ${client.id}`);
        const waiter = this.activeWaiters[client.id];
        if (waiter) {
            delete this.activeWaiters[client.id];
            this.broadcastActiveWaiters(waiter.store_id);
        }
    }
    broadcastActiveWaiters(store_id) {
        const waitersList = Object.values(this.activeWaiters).filter(w => w.store_id === store_id);
        this.server.to(`store_${store_id}`).emit('update_active_waiters', waitersList);
    }
    handleJoinStore(data, client) {
        const roomName = `store_${data.store_id}`;
        client.join(roomName);
        console.log(`[SOCKET] Client ${client.id} joined room: ${roomName}`);
        return { event: 'joined', data: roomName };
    }
    handleNewTerminalOrder(data) {
        const roomName = `store_${data.store_id}`;
        this.server.to(roomName).emit('TERMINAL_ORDER_RECEIVED', data);
        return { success: true };
    }
    handleGeneratePin(data) {
        this.activeWaiterPins[data.pin] = data.store_id;
        console.log(`[SOCKET] Waiter PIN ${data.pin} registered for store ${data.store_id}`);
        return { success: true };
    }
    handleAuthWaiterPin(data, client) {
        const storeId = this.activeWaiterPins[data.pin];
        if (storeId) {
            const roomName = `store_${storeId}`;
            client.join(roomName);
            console.log(`[SOCKET] Waiter authenticated with PIN ${data.pin} for store ${storeId}`);
            const existingCount = Object.values(this.activeWaiters).filter(w => w.store_id === storeId).length;
            const waiterName = `Waiter ${existingCount + 1}`;
            this.activeWaiters[client.id] = { store_id: storeId, name: waiterName };
            this.broadcastActiveWaiters(storeId);
            return { success: true, store_id: storeId, name: waiterName };
        }
        return { success: false, message: 'Invalid PIN' };
    }
    handleWaiterConnected(data) {
        const roomName = `store_${data.store_id}`;
        this.server.to(roomName).emit('waiter_connected', data);
        return { success: true };
    }
    handleWaiterDisconnected(data) {
        const roomName = `store_${data.store_id}`;
        this.server.to(roomName).emit('waiter_disconnected', data);
        return { success: true };
    }
    handleKickWaiter(data) {
        const clientId = Object.keys(this.activeWaiters).find(id => this.activeWaiters[id].name === data.name && this.activeWaiters[id].store_id === data.store_id);
        if (clientId) {
            this.server.to(clientId).emit('force_logout');
            delete this.activeWaiters[clientId];
            this.broadcastActiveWaiters(data.store_id);
        }
    }
    broadcast(event, payload, room) {
        if (this.server) {
            if (room) {
                this.server.to(room).emit(event, payload);
            }
            else {
                this.server.emit(event, payload);
            }
        }
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_store'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinStore", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('NEW_TERMINAL_ORDER'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleNewTerminalOrder", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('generate_waiter_pin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleGeneratePin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('auth_waiter_pin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleAuthWaiterPin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('waiter_connected'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleWaiterConnected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('waiter_disconnected'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleWaiterDisconnected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('kick_waiter'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleKickWaiter", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        },
    })
], AppGateway);
//# sourceMappingURL=app.gateway.js.map