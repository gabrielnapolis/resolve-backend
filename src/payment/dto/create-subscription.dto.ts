import { PaymentPhone } from './pagbank.subscription.dto';

export class CreateSubscriptionDto {
  planId: string;
  customer: {
    name?: string;
    email?: string;
    tax_id?: string; //cpf-cnpj
    phones?: PaymentPhone[];
  }
  card: string;
  payment_method: string;
}
