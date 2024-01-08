import { Type } from 'class-transformer';
import { CardDto } from './card.dto';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field()
  card: CardDto;

  @IsNumber()
  @Field()
  amount: number;
}
