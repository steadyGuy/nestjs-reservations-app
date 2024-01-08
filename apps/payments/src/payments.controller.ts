import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';
import {
  PaymentServiceController,
  PaymentServiceControllerMethods,
} from '@app/common';

@Controller()
@PaymentServiceControllerMethods()
export class PaymentsController implements PaymentServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(data: PaymentsCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
