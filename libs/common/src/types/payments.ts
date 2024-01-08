/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface CreateChargeMessage {
  email: string;
  amount: number;
  card: CardMessage | undefined;
}

export interface CardMessage {
  cvc: string;
  expMonth: number;
  expYear: number;
  number: string;
}

export interface CreateChargeResponse {
  id: string;
}

export const PAYMENTS_PACKAGE_NAME = 'payments';

export interface PaymentServiceClient {
  createCharge(request: CreateChargeMessage): Observable<CreateChargeResponse>;
}

export interface PaymentServiceController {
  createCharge(
    request: CreateChargeMessage,
  ):
    | Promise<CreateChargeResponse>
    | Observable<CreateChargeResponse>
    | CreateChargeResponse;
}

export function PaymentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createCharge'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('PaymentService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('PaymentService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PAYMENT_SERVICE_NAME = 'PaymentService';
