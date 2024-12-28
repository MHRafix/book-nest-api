import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/api/user/entities/user.entity';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  views: number;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  creator: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
