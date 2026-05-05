import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  userId!: string;

  @Prop()
  amount!: number;

  @Prop()
  status!: string; 
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);