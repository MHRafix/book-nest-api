import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  verifyMagicLink(@Query('token') token: string) {
    const payload = this.authService.verifyToken(token);
    if (payload) {
      return this.userService.createOrGetUser(payload?.email);
    }
    return { message: 'Invalid or expired token.' };
  }
}
