import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // console.log('New user connected', client?.id);

    client.broadcast.emit('connected', {
      message: 'New book added to list.',
    });
  }

  handleDisconnect(client: Socket) {
    // console.log('User disconnected:', client.id);

    this.server.emit('disconnected', {
      message: `User disconnected: ${client.id}`,
    });
  }

  // Broadcast a message to all connected clients
  @SubscribeMessage('notify')
  broadcastBookAddedMessage(@MessageBody() message: string) {
    this.server.emit('bookAdded', message);
  }
}
