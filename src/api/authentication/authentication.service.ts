import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { SendMagicLinkDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  generateMagicLink(email: string): string {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    return `http://localhost:8800/authentication/verify?token=${token}`;
  }

  async sendMagicLink({ email }: SendMagicLinkDto): Promise<void> {
    const magicLink = this.generateMagicLink(email);

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Adjust based on your email provider
      auth: {
        user: 'rafiz.mehedi@gmail.com',
        pass: 'jrzz xkcx rzcg ybsg', // Use environment variables
      },
    });

    await transporter.sendMail({
      from: 'rafiz.mehedi@gmail.com',
      to: email,
      subject: 'Your Magic Link',
      text: `Click the link to log in: ${magicLink}`,
    });
  }

  verifyToken(token: string): { email: string } | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as { email: string };
    } catch {
      return null;
    }
  }
}
