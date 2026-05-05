import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('pay')
  pay(@Body() body) {
    return this.paymentService.processPayment(body);
  }
}