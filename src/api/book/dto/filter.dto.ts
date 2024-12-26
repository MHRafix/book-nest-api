import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterBooksDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  minPrice?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  maxPrice?: number;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number;
}
