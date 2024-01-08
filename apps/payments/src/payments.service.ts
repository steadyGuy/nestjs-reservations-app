import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      automatic_payment_methods: { allow_redirects: 'never', enabled: true },
      currency: 'usd',
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Payment of $${amount} has completed successfully!`,
    });

    return paymentIntent;
  }

  async getPayments() {
    const paymens = await this.stripe.paymentIntents.list();
    return paymens.data;
  }
}
