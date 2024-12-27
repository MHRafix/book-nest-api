import {
  Body,
  Controller,
  Delete,
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
  @ApiOperation({ description: 'Only logged in user can perform' })
  @UseGuards(AuthGuard())
  @Post('/createOrGetUser')
  createOrGetUser(
    @Query() subscriber: MagicLinkDto,
    @Body() payload?: RegistrationDto,
  ) {
    return this.userService.createOrGetUser(subscriber?.email, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can perform' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/all-users')
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can perform' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can perform' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can perform' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
