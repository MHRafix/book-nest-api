import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  // mail transporter
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  // send mail to user email with link
  async sendMagicLink(email: string, magicLink: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Magic Login Link',
      html: `<p>Click <a href="${magicLink}">here</a> to log in!</p>`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
