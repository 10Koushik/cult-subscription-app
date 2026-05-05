import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt.guard';


@Controller('subscription')
export class SubscriptionController {
  constructor(private subService: SubscriptionService) {}

  @Post('create')
  create(@Body() body) {
    return this.subService.createSubscription(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  subscribe(@Body() body) {
    return this.subService.subscribeUser(body);
  }

  
}