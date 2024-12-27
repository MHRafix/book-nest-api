import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';
import { MagicLinkDto } from './dto/magic-link.dto';

@Controller('authentication')
@ApiTags('Authentication Module')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({})
  @Post('send-magic-link')
  async sendMagicLink(
    @Body() payload: MagicLinkDto,
  ): Promise<{ message: string }> {
    await this.authService.sendMagicLink(payload);
    return { message: 'Magic link sent to your email.' };
  }

  @ApiOperation({})
  @Get('verify-link')
  async verifyMagicLink(@Query('token') token: string) {
    const payload = this.authService.verifyToken(token);
    if (payload) {
      const user = await this.userService.createOrGetUser(payload?.email);
      // @ts-ignore
      return { token, _id: user?._id };
    }
    throw new ForbiddenException('Token is expired.');
  }
}
