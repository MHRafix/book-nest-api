import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  updatedAt: Date;

  @Prop({ required: false })
  createdAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
