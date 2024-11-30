import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionRepository: Repository<Subscription>,
    @Inject('CONTRACTOR_REPOSITORY')
    private contractorRepository: Repository<Contractor>,
    @Inject('PLAN_REPOSITORY') 
    private planRepository: Repository<Plan>,
  ) {}

  async getActiveContractorByid(id: string) {
    return await this.contractorRepository.findOne({
      where: {
        active: true,
        id: id,
      },
    });
  }

  async getPlanById(id) {
    return await this.planRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findActivePlanByContractor(contractor) {
    return await this.subscriptionRepository.findOne({
        where: {
          active: true,
          contractor: {
            id: contractor.id,
          },
        },
        order: {
            createdAt: 'desc'
        }
      });
  }

  create(subscription: Subscription) {
    return this.subscriptionRepository.create(subscription);
  }

  async updateSubscriberId(contractor: Contractor, subscriberId: string) {
    contractor.subscriberId = subscriberId;
    await this.contractorRepository.update(contractor.id, contractor);
  }

  async deactivatePlan(planId: string) {
    await this.planRepository.update(planId, {active: false});
  }
}
