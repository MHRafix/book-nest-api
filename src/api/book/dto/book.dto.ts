import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class BookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  views?: 0;
}
