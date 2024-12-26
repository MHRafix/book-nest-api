import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { MagicLinkDto } from './dto/magic-link.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthenticationService {
  constructor(private emailService: EmailService) {}
  /**
   * generate magic link
   * @param email string
   * @returns
   */
  generateMagicLink(email: string): string {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    return `http://localhost:8800/authentication/-link?token=${token}`;
  }

  /**
   * send magic link
   * @param payload - string
   */
  async sendMagicLink(payload: MagicLinkDto): Promise<void> {
    // create magic link
    const magicLink = this.generateMagicLink(payload?.email);

    // send mail to user email with magicLink
    this.emailService.sendMagicLink(payload?.email, magicLink);
  }

  /**
   * Verify magic link
   * @param token string
   * @returns
   */
  verifyToken(token: string): { email: string } | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as { email: string };
    } catch {
      return null;
    }
  }
}
