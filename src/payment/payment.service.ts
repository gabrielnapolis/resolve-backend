import { Injectable } from '@nestjs/common';
import { PagbankRepository } from './repository/pagbank.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionResponseDTO } from './dto/payment-response.dto';
import { SubscriptionRepository } from './repository/subscription.repository';
import { PagBank } from './dto/pagbank.subscription.dto';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Plan } from './entities/plan.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentPlatform: PagbankRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async payWithPix(dto: CreateSubscriptionDto) {
    let result = await this.startPayment(PagBank.PaymentType.Pix, dto);
    if (!result.success) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    let { contractor, plan, body } = result;

    let sub =
      await this.subscriptionRepository.findActiveSubscritionByContractor(
        contractor,
      );
    if (sub)
      return {
        success: false,
        errors: ['Contractor already has an active subscription.'],
      };

    let payment = await this.paymentPlatform.generatePixQrCode(
      body as PagBank.PixDTO,
    );
    if (!payment)
      return {
        success: false,
        errors: ['Could not create a new payment.'],
      };

    const nextInvoiceAt = new Date();
    nextInvoiceAt.setDate(nextInvoiceAt.getDate() + 30);

    let subscription = {
      externalId: payment.id,
      plan: { id: plan.id },
      contractor: { id: contractor.id },
      active: false,
      externalStatus: 'PENDING',
      nextInvoiceAt: nextInvoiceAt,
    } as Subscription;

    await this.subscriptionRepository.create(subscription);

    return {
      success: true,
      data: {
        id: payment.id,
        payment: payment.qr_codes[0],
      },
    };
  }

  async subscribe(
    dto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDTO> {
    let result = await this.startPayment(PagBank.PaymentType.Subscription, dto);
    if (!result.success) {
      return {
        success: false,
        errors: result.errors,
      };
    }
    let { contractor, plan, body, pagbankPlan } = result;

    let pagbankData = body;

    if (contractor.subscriberId) {
      let sub =
        await this.subscriptionRepository.findActiveSubscritionByContractor(
          contractor,
        );
      if (sub)
        return {
          success: false,
          errors: ['Contractor already has an active subscription.'],
        };

      pagbankData.setSubscriberId(contractor.subscriberId);
    }

    pagbankData.setAmount(pagbankPlan.amount.value);
    let payment = await this.paymentPlatform.subscribe(
      pagbankData as PagBank.SubscriptionDTO,
    );
    if (!payment)
      return {
        success: false,
        errors: ['Could not create a new payment.'],
      };

    let subscription = {
      externalId: payment.id,
      plan: { id: plan.id },
      contractor: { id: contractor.id },
      active: true,
      externalStatus: payment.status,
      nextInvoiceAt: payment.next_invoice_at,
    } as Subscription;

    await this.subscriptionRepository.create(subscription);
    await this.subscriptionRepository.updateSubscriberId(
      contractor,
      payment.customer.id,
    );

    return {
      success: true,
      data: subscription,
    };
  }

  async cancelSubscription(userId: string) {
    let contractor =
      await this.subscriptionRepository.getActiveContractorByid(userId);

    if (!contractor)
      return { success: false, errors: ['Contractor not found'] };

    let subscription =
      await this.subscriptionRepository.findActiveSubscritionByContractor(
        contractor,
      );

    if (!subscription)
      return { success: false, errors: ['subscription not found'] };

    console.log(
      'Canceling subscription: ',
      `${subscription.externalId} ${subscription.id}`,
    );
    await this.paymentPlatform.cancelSubscription(subscription.externalId);
    await this.subscriptionRepository.deactivateSubscription(subscription.id);
    return { success: true, errors: [] };
  }

  async capturePix(orderId: string) {
    let order = await this.paymentPlatform.capturePix(orderId);
    let subscription = await this.processPix(order);
    return subscription;
  }

  async processPix(dto: any) {
    let subscriptions = await this.subscriptionRepository.find({
      where: {
        externalId: dto.id,
        externalStatus: 'PENDING',
        active: false,
      },
    } as FindManyOptions<Subscription>);

    if (
      dto &&
      subscriptions &&
      subscriptions.length > 0 &&
      dto.charges &&
      dto.charges.length > 0
    ) {
      let charge = dto.charges[0];

      let pending = ['IN_ANALYSIS', 'AUTHORIZED', 'WAITING'];
      if (pending.includes(charge.status)) {
        return;
      }

      let subs = subscriptions[0];
      let declined = ['DECLINED', 'CANCELED'];
      if (declined.includes(charge.status)) {
        subs.active = false;
        subs.externalStatus = charge.status;
        await this.subscriptionRepository.update(subs);
      }

      if (charge.status == 'PAID') {
        console.log('Pagamento confirmado', subs);
        subs.active = true;
        subs.externalStatus = 'ACTIVE';
        await this.subscriptionRepository.update(subs);
      }

      return subs;
    }

    subscriptions = await this.subscriptionRepository.find({
      where: {
        externalId: dto.id,
        externalStatus: 'ACTIVE',
      },
    } as FindManyOptions<Subscription>);

    if (subscriptions && subscriptions.length > 0) {
      return subscriptions[0];
    }

    return null;
  }

  async findUserSubscription(userId: string) {
    let param = {
      id: userId,
    };
    return await this.subscriptionRepository.findActiveSubscritionByContractor(
      param,
    );
  }

  private async startPayment(
    paymentType: PagBank.PaymentType,
    dto: CreateSubscriptionDto,
  ): Promise<{
    contractor?: Contractor;
    plan?: Plan;
    pagbankPlan?: any;
    body?: PagBank.IPagBankPaymentType;
    success?: boolean;
    errors?: string[];
  }> {
    let contractor = await this.subscriptionRepository.getActiveContractorByid(
      dto.userId,
    );
    if (!contractor) return { success: false, errors: ['User not found.'] };

    if (!contractor.subscriberId) {
      let data = await this.paymentPlatform.findSubscriberByEmail(
        contractor.email,
      );

      if (data.customers.length > 0) {
        let subscriber = data.customers[0];
        contractor.subscriberId = subscriber.id;
        await this.subscriptionRepository.updateSubscriberId(
          contractor,
          subscriber.id,
        );
      }
    }

    ///==========================================================
    /// TODO: configurar ID do plano padrão no banco
    ///==========================================================
    const defaultPlanId = this.subscriptionRepository.getDefaultPlan();
    let plan = await this.subscriptionRepository.getPlanById(defaultPlanId);
    if (!plan) return { success: false, errors: ['Plan not found.'] };

    const pagbankPlan = await this.paymentPlatform.getPlanById(
      plan.external_id,
    );

    if (!pagbankPlan || pagbankPlan.status != 'ACTIVE') {
      this.subscriptionRepository.deactivatePlan(plan?.id);
      return { success: false, errors: ['Plan not found.'] };
    }

    let pagbankData =
      paymentType == PagBank.PaymentType.Subscription
        ? new PagBank.SubscriptionDTO(contractor, dto, plan.external_id)
        : new PagBank.PixDTO(pagbankPlan.name, contractor);

    pagbankData.setAmount(pagbankPlan.amount.value);

    return {
      body: pagbankData,
      pagbankPlan,
      contractor,
      plan,
      success: true,
    };
  }
}
