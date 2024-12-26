import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MagicLinkDto } from '../authentication/dto/magic-link.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Module')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({})
  @Post('/createOrGetUser')
  createOrGetUser(
    @Query() subscriber: MagicLinkDto,
    @Body() payload?: RegistrationDto,
  ) {
    return this.userService.createOrGetUser(subscriber?.email, payload);
  }

  @ApiOperation({})
  @Get('/all-users')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
