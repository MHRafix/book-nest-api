import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Module({
  // imports: [UserModule],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationModule {}
