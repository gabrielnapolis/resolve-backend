import { Contractor } from 'src/contractor/entities/contractor.entity';
import { CreateSubscriptionDto } from './create-subscription.dto';

export default class PagbankSubscriptionDTO {
  constructor() {}

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
    };
  }

  static build(
    planId: string,
    contractor: Contractor,
    dto: CreateSubscriptionDto,
  ): PagbankSubscriptionDTO {
    let pag = new PagbankSubscriptionDTO();
    pag.plan = { id: planId };
    pag.customer = {
      name: contractor.fullname,
      email: contractor.email,
      tax_id: dto.cpf.replace(/\D/g, ''),
      phones: [
        {
          country: '55',
          area: contractor.fone.substring(0, 2),
          number: contractor.fone.substring(2, contractor.fone.length),
        },
      ],
      billing_info: [{
        type: PAYMENT_TYPE.CreditCard,
        card: {
          encrypted: dto.card
        }
      }]
    };

    pag.amount = {
      currency: 'BRL',
      value: 0,
    };

    pag.payment_method = [
      {
        type: PAYMENT_TYPE.CreditCard,
        card: {
          encrypted: dto.card,
          security_code: dto.cvv
        },
      },
    ];
    pag.pro_rata = false;
    return pag;
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
    encrypted: string;
    security_code: string
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
