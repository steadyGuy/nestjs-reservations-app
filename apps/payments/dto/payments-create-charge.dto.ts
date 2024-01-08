import { CreateChargeDto, CreateChargeMessage } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDto
  extends CreateChargeDto
  implements CreateChargeMessage
{
  @IsEmail()
  email: string;
}
