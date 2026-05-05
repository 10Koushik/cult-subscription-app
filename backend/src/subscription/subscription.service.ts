import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './subscription.schema';
import { Model } from 'mongoose';
import { PaymentService } from '../payment/payment.service';
import { MailService } from '../mail/mail.service';


@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subModel: Model<Subscription>,
    private paymentService: PaymentService, 
    private mailService: MailService,
  ) {}

  async createSubscription(data: any) {
    return this.subModel.create({
      userId: data.userId,
      plan: data.plan,
      status: 'active',
      startDate: new Date(),
    });
  }

  // async subscribeUser(data: any) {

  //   const payment = await this.paymentService.processPayment({
  //     userId: data.userId,
  //     amount: data.amount,
  //   });

  //   if (payment.status === 'success') {

  //     const subscription = await this.subModel.create({
  //       userId: data.userId,
  //       plan: data.plan,
  //       status: 'active',
  //       startDate: new Date(),
  //     });

  //     await this.mailService.sendMail(data.email);

  //     return {
  //       message: 'Subscription successful + Email sent',
  //       subscription,
  //     };
  //   }

  //   return {
  //     message: 'Payment failed',
  //   };
  // }

  async subscribeUser(data: any) {

    const payment = await this.paymentService.processPayment({
      userId: data.userId,
      amount: data.amount,
    });

    if (payment.status === 'success') {

      const subscription = await this.subModel.create({
        userId: data.userId,
        plan: data.plan,
        status: 'active',
        startDate: new Date(),
      });

      await this.mailService.sendMail(data.email);

      return {
        message: 'Subscription successful',
        subscription,
      };
    }

    return { message: 'Payment failed' };
  }

}

