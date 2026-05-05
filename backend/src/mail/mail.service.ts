import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

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

      // ✅ Create test account (Ethereal)
      const testAccount = await nodemailer.createTestAccount();

      // ✅ Create transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      // ✅ Send mail
      const info = await transporter.sendMail({
        from: '"Cult App" <no-reply@cult.com>',
        to,
        subject: 'Subscription Successful 🎉',
        text: 'Your subscription is now active!',
      });

      // ✅ VERY IMPORTANT (preview link)
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));

      return { message: 'Test email sent (check console)' };

    } catch (error) {
      console.log('MAIL ERROR:', error);
      throw error;
    }
  }
}