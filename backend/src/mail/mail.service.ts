import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) { }

  //   async sendMail(to: string) {
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   await transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to,
  //     subject: 'Subscription Successful',
  //     text: 'Your subscription is active',
  //   });
  // }

  async sendMail(to: string) {
    try {

      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: '"Cult App" <no-reply@cult.com>',
        to,
        subject: 'Subscription Successful 🎉',
        text: 'Your subscription is now active!',
      });
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('📧 Preview URL:', previewUrl);
      return {
        message: 'Test email sent',
        previewUrl, 
      };
    } catch (error) {
      console.log('MAIL ERROR:', error);
      throw error;
    }
  }
}