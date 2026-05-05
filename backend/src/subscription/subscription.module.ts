import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './subscription.schema';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PaymentModule } from '../payment/payment.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    PaymentModule,
    MailModule,
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}