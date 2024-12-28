import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for simplicity; adjust for production
  },
})
export class NotificationGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server; // The WebSocket server instance

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
    // You can now safely use this.server here
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendNotification')
  sendNotification(
    @MessageBody() data: { userId: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Notification received:`, data);
    this.server.emit('receiveNotification', data); // Broadcast to all connected clients
  }

  // Example method for programmatically broadcasting
  broadcastNotification(message: any): void {
    if (!this.server) {
      console.error('WebSocket server not initialized');
      return;
    }
    this.server.emit('receiveNotification', { message });
  }
}
