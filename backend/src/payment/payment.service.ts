import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) { }

  // async processPayment(data: any) {
  //   // Dummy logic: always success
  //   const payment = await this.paymentModel.create({
  //     userId: data.userId,
  //     amount: data.amount,
  //     status: 'success',
  //   });

  //   return payment;
  // }

  async processPayment(data: any) {
    return {
      status: 'success',
      amount: data.amount,
    };
  }
}