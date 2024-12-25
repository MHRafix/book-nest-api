import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SendMagicLinkDto } from './dto/login.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOperation({})
  @Post('send-magic-link')
  async sendMagicLink(
    @Body() payload: SendMagicLinkDto,
  ): Promise<{ message: string }> {
    await this.authService.sendMagicLink(payload);
    return { message: 'Magic link sent to your email.' };
  }

  @ApiOperation({})
  @Get('verify')
  verifyMagicLink(@Query('token') token: string): { message: string } {
    const payload = this.authService.verifyToken(token);
    if (payload) {
      return { message: `Welcome, ${payload.email}!` };
    }
    return { message: 'Invalid or expired token.' };
  }
}

// @ApiBearerAuth()
// @ApiOperation({ description: 'Only admin can access ' })
// @Roles(Role.Admin)
// @UseGuards(AuthGuard(), RolesGuard)
