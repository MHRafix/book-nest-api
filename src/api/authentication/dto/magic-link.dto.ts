import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class MagicLinkDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please type a valid email!' })
  email: string;
}
