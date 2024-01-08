import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private notificationService: NotificationsServiceClient;
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_PACKAGE_NAME)
    private readonly client: ClientGrpc,
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

    // at runtime, without using onModule
    if (!this.notificationService) {
      this.notificationService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    }

    this.notificationService
      .notifyEmail({
        email,
        text: `Payment of $${amount} has completed successfully!`,
      })
      .subscribe(() => {});

    return paymentIntent;
  }
}
