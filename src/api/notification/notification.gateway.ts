import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// @WebSocketGateway()
// export class NotificationGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   constructor(private readonly notificationService: NotificationService) {}
//   handleConnection(client: any, ...args: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   handleConnection(client: any, ...args: any[]) {
//     throw new Error('Method not implemented.');
//   }

//   @SubscribeMessage('createNotification')
//   create(@MessageBody() createNotificationDto: CreateNotificationDto) {
//     return this.notificationService.create(createNotificationDto);
//   }

//   @SubscribeMessage('findAllNotification')
//   findAll() {
//     return this.notificationService.findAll();
//   }

//   @SubscribeMessage('findOneNotification')
//   findOne(@MessageBody() id: number) {
//     return this.notificationService.findOne(id);
//   }

//   @SubscribeMessage('updateNotification')
//   update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
//     return this.notificationService.update(
//       updateNotificationDto.id,
//       updateNotificationDto,
//     );
//   }

//   @SubscribeMessage('removeNotification')
//   remove(@MessageBody() id: number) {
//     return this.notificationService.remove(id);
//   }
// }

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  broadcastMessage(event: string, message: any) {
    this.server.emit(event, message);
  }
}
