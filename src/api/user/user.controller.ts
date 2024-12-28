import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/app/decorators/role.decorator';
import { RolesGuard } from 'src/app/guards/role-guard';
import { MagicLinkDto } from '../authentication/dto/magic-link.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Module')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Signup' })
  @UseGuards(AuthGuard())
  @Post('/createOrGetUser')
  createOrGetUser(
    @Query() subscriber: MagicLinkDto,
    @Body() payload?: RegistrationDto,
  ) {
    return this.userService.createOrGetUser(subscriber?.email, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all users' })
  // @Roles(Role.Admin)
  @UseGuards(AuthGuard())
  @Get('/all-users')
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single user' })
  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Update user' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
