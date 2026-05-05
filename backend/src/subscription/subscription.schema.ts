import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop()
  userId!: string;

  @Prop()
  plan!: string;

  @Prop()
  status!: string;

  @Prop()
  startDate!: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);