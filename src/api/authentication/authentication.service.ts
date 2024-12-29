import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MagicLinkDto } from './dto/magic-link.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}
  /**
   * generate magic link
   * @param email string
   * @returns
   */
  generateMagicLink(email: string): string {
    const token = this.jwtService.sign({
      email,
    });

    return `${process.env.APP_LIVE_URL}/auth/verify-link?token=${token}`;
  }

  /**
   * send magic link
   * @param payload - string
   */
  async sendMagicLink(payload: MagicLinkDto): Promise<void> {
    // create magic link
    const magicLink = this.generateMagicLink(payload?.email);

    // send mail to user email with magicLink
    return this.emailService.sendMagicLink(payload?.email, magicLink);
  }

  /**
   * Verify magic link
   * @param token string
   * @returns
   */
  verifyToken(token: string): { email: string } | null {
    try {
      return this.jwtService.verify(token) as {
        email: string;
      };
    } catch {
      return null;
    }
  }
}
