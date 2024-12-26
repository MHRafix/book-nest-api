import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    unique: [true, 'This email already used try with another email!'],
  })
  email: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ type: String, enum: Role, required: false, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
