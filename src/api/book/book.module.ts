import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { NotificationModule } from '../notification/notification.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    NotificationModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
