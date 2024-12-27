import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  views: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
