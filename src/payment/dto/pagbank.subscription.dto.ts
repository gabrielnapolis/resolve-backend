import { Contractor } from 'src/contractor/entities/contractor.entity';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { Plan } from '../entities/plan.entity';

export namespace PagBank {
  export enum PaymentType {
    Pix,
    Subscription,
  }

  export interface IPagBankPaymentType {
    setAmount(amount: number): void;
    setSubscriberId(id: string): void;
  }

  export class SubscriptionDTO implements IPagBankPaymentType {
    plan: { id: string };
    customer: CustomerPayload;
    pro_rata: boolean = false;
    payment_method: PaymentMethod[];
    amount: Amount;

    constructor(
      contractor: Contractor,
      dto: CreateSubscriptionDto,
      planId: string,
    ) {
      this.plan = { id: planId };
      this.customer = {
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
        billing_info: [
          {
            type: PAYMENT_TYPE.CreditCard,
            card: {
              encrypted: dto.card,
            },
          },
        ],
      };

      this.amount = {
        currency: 'BRL',
        value: 0,
      };

      this.payment_method = [
        {
          type: PAYMENT_TYPE.CreditCard,
          card: {
            encrypted: dto.card,
            security_code: dto.cvv,
          },
        },
      ];
      this.pro_rata = false;
    }

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
  }

  export class PixDTO implements IPagBankPaymentType {
    customer: CustomerPayload;
    qr_codes: { amount: Amount }[];
    notification_urls: string[];
    items: Item[];
    private description: string;

    constructor(description: string, contractor: Contractor) {
      this.customer = {
        name: contractor.fullname,
        email: contractor.email,
        tax_id: contractor.cpf.replace(/\D/g, ''),
        phones: [
          {
            country: '55',
            area: contractor.fone.substring(0, 2),
            number: contractor.fone.substring(2, contractor.fone.length),
            type: 'MOBILE',
          },
        ],
      };

      this.notification_urls = [
        'https://webhook.site/6deea5cb-90a9-49d1-a94e-67288d7b0ed7',
      ];
      this.description = description;
    }

    setAmount(amount: number): void {
      this.qr_codes = [
        {
          amount: { value: amount },
        },
      ];

      this.items = [
        {
          name: this.description,
          unit_amount: amount,
          quantity: 1,
        },
      ];
    }

    setSubscriberId(id: string): void {}
  }

  type CustomerPayload = {
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

  type PaymentMethod = {
    type: PAYMENT_TYPE;
    card: {
      encrypted: string;
      security_code: string;
    };
  };

  type PaymentPhone = {
    country: string;
    area: string;
    number: string;
    type?: string;
  };

  type Amount = {
    value: number;
    currency?: string;
  };

  type Item = {
    name: string;
    quantity: number;
    unit_amount: number;
  };

  enum PAYMENT_TYPE {
    CreditCard = 'CREDIT_CARD',
    Boleto = 'BOLETO',
  }
}
