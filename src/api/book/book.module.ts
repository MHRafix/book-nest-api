import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BookController } from './book.controller';
import { BookGateway } from './book.gateway';
import { BookService } from './book.service';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, BookGateway],
})
export class BookModule {}
