import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Adjust based on your CORS requirements
  },
})
export class BookGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    client.on('connection', () => {
      client.on('setup', (userData: any) => {
        client.join(userData?._id);
        client.emit('connected');
      });

      client.on('join chat', (room: string) => {
        client.join(room);
      });

      client.off('setup', (userData: any) => {
        client.leave(userData?._id);
      });
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Broadcast a message to all connected clients
  broadcastBookAdded(book: any) {
    this.server.emit('bookAdded', book);
  }
}
