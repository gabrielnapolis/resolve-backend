import { CreateSubscriptionDto } from './create-subscription.dto';

export default class PagbankSubscriptionDTO {
  plan: { id: string };
  customer: CustomerPayload;
  pro_rata: boolean = false;
  payment_method: PaymentMethod[];
  amount: Amount;

  setSubscriberId(id: string) {
    this.customer = {
      id: id,
    };
  }

  setAmount(amount: number) {
    this.amount = {
        currency: 'BRL',
        value: amount,
      }
  }

  static build(dto: CreateSubscriptionDto): PagbankSubscriptionDTO {
    return {
      plan: {
        id: dto.planId,
      },
      customer: {
        name: dto.customer.name,
        email: dto.customer.email,
        phones: dto.customer.phones,
        tax_id: dto.customer.tax_id,
      },
      amount: {
        currency: 'BRL',
        value: 0,
      },
      payment_method: [
        {
          type: PAYMENT_TYPE.CreditCard,
          card: {
            security_code: dto.card,
          },
        },
      ],
      pro_rata: false
    } as PagbankSubscriptionDTO;
  }
}

export type CustomerPayload = {
  id?: string;
  name?: string;
  email?: string;
  tax_id?: string; //cpf-cnpj
  phones?: PaymentPhone[];
  billing_info?: [
    {
      card: {
        encrypted: string;
      };
      type: string;
    },
  ];
};

export interface PaymentMethod {
  type: PAYMENT_TYPE;
  card: {
    security_code: string;
  };
}

export interface PaymentPhone {
  country: string;
  area: string;
  number: string;
}

export enum PAYMENT_TYPE {
  CreditCard = 'CREDIT_CARD',
  Boleto = 'BOLETO',
}

export type Amount = {
  value: number;
  currency: string;
};
