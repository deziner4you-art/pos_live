import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private activeWaiterPins;
    private activeWaiters;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private broadcastActiveWaiters;
    handleJoinStore(data: {
        store_id: number;
    }, client: Socket): {
        event: string;
        data: string;
    };
    handleNewTerminalOrder(data: any): {
        success: boolean;
    };
    handleGeneratePin(data: {
        store_id: number;
        pin: string;
    }): {
        success: boolean;
    };
    handleAuthWaiterPin(data: {
        pin: string;
    }, client: Socket): {
        success: boolean;
        store_id: number;
        name: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        store_id?: undefined;
        name?: undefined;
    };
    handleWaiterConnected(data: {
        store_id: number;
    }): {
        success: boolean;
    };
    handleWaiterDisconnected(data: {
        store_id: number;
    }): {
        success: boolean;
    };
    handleKickWaiter(data: {
        name: string;
        store_id: number;
    }): void;
    broadcast(event: string, payload: any, room?: string): void;
}
