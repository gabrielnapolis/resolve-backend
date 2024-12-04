import { Injectable } from '@nestjs/common';
import { PagbankRepository } from './repository/pagbank.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionResponseDTO } from './dto/payment-response.dto';
import { SubscriptionRepository } from './repository/subscription.repository';
import PagbankSubscriptionDTO from './dto/pagbank.subscription.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentPlatform: PagbankRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  pay(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async subscribe(
    dto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDTO> {
    let contractor = await this.subscriptionRepository.getActiveContractorByid(
      dto.userId,
    );
    if (!contractor) return { success: false, errors: ['User not found.'] };

    const defaultPlanId = '1';
    let plan = await this.subscriptionRepository.getPlanById(defaultPlanId);
    if (!plan) return { success: false, errors: ['Plan not found.'] };

    const pagbankPlan = await this.paymentPlatform.getPlanById(
      plan.external_id,
    );
    if (!pagbankPlan || pagbankPlan.status != 'ACTIVE') {
      this.subscriptionRepository.deactivatePlan(plan?.id);
      return { success: false, errors: ['Plan not found.'] };
    }

    let pagbankData = PagbankSubscriptionDTO.build(
      plan.external_id,
      contractor,
      dto,
    );
    if (contractor.subscriberId) {
      let sub =
        await this.subscriptionRepository.findActiveSubscritionByContractor(
          contractor,
        );
      if (sub)
        return {
          success: false,
          errors: ['Veterinarian has an active subscription.'],
        };

      pagbankData.setSubscriberId(contractor.subscriberId);
    }

    pagbankData.setAmount(pagbankPlan.amount.value);
    let payment = await this.paymentPlatform.subscribe(pagbankData);
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

  async cancelSubscription() {
    let contractor =
      await this.subscriptionRepository.getActiveContractorByid('id');
    let subscription =
      await this.subscriptionRepository.findActiveSubscritionByContractor(
        contractor,
      );

    if (!subscription) return 'subscription not found';

    await this.paymentPlatform.cancelSubscription(subscription.id);
    return;
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
