import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from './api/authentication/authentication.module';
import { BookModule } from './api/book/book.module';
// import { NotificationModule } from './api/notification/notification.module';
import { NotificationModule } from './api/notification/notification.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),

    // APis implement here
    NotificationModule,
    UserModule,
    BookModule,
    AuthenticationModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
