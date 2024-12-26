import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

export class RegistrationDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false, default: Role.User })
  @IsOptional()
  @IsEnum(Role)
  role: Role.User;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar: string;
}
