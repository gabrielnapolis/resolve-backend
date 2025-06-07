import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PagbankRepository } from './repository/pagbank.repository';
import { SubscriptionRepository } from './repository/subscription.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PagBank } from './dto/pagbank.subscription.dto';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Plan } from './entities/plan.entity';

describe('PaymentService', () => {
  let service: PaymentService;
  let pagbankRepository: PagbankRepository;
  let subscriptionRepository: SubscriptionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PagbankRepository,
          useValue: {
            getPlanById: jest.fn(),
            generatePixQrCode: jest.fn(),
            subscribe: jest.fn(),
            capturePix: jest.fn(),
            cancelSubscription: jest.fn(),
            findSubscriberByEmail: jest.fn(),
          },
        },
        {
          provide: SubscriptionRepository,
          useValue: {
            getPlanById: jest.fn(),
            deactivatePlan: jest.fn(),
            findActiveSubscritionByContractor: jest.fn(),
            create: jest.fn(),
            updateSubscriberId: jest.fn(),
            getActiveContractorByid: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            deactivateSubscription: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    pagbankRepository = module.get<PagbankRepository>(PagbankRepository);
    subscriptionRepository = module.get<SubscriptionRepository>(
      SubscriptionRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('startPayment', () => {
    it('should return error if contractor is not found', async () => {
      jest
        .spyOn(subscriptionRepository, 'getActiveContractorByid')
        .mockResolvedValue(null);

      const dto = new CreateSubscriptionDto();
      dto.userId = '1';

      const result = await service['startPayment'](
        PagBank.PaymentType.Subscription,
        dto,
      );

      expect(result).toEqual({ success: false, errors: ['User not found.'] });
    });

    it('should return error if plan is not found', async () => {
      jest
        .spyOn(subscriptionRepository, 'getActiveContractorByid')
        .mockResolvedValue({} as Contractor);
      jest.spyOn(subscriptionRepository, 'getPlanById').mockResolvedValue(null);

      const dto = new CreateSubscriptionDto();
      dto.userId = '1';

      const result = await service['startPayment'](
        PagBank.PaymentType.Subscription,
        dto,
      );

      expect(result).toEqual({ success: false, errors: ['Plan not found.'] });
    });

    it('should return error if pagbankPlan is not active', async () => {
      jest
        .spyOn(subscriptionRepository, 'getActiveContractorByid')
        .mockResolvedValue({} as Contractor);
      jest
        .spyOn(subscriptionRepository, 'getPlanById')
        .mockResolvedValue({ external_id: '123' } as Plan);
      jest
        .spyOn(pagbankRepository, 'getPlanById')
        .mockResolvedValue({ status: 'INACTIVE' });

      const dto = new CreateSubscriptionDto();
      dto.userId = '1';

      const result = await service['startPayment'](
        PagBank.PaymentType.Subscription,
        dto,
      );

      expect(result).toEqual({ success: false, errors: ['Plan not found.'] });
    });

    it('should return success if all conditions are met', async () => {
      const contractor = {} as Contractor;
      const plan = { external_id: '123' } as Plan;
      const pagbankPlan = { status: 'ACTIVE', amount: { value: 100 } };

      jest
        .spyOn(subscriptionRepository, 'getActiveContractorByid')
        .mockResolvedValue(contractor);
      jest.spyOn(subscriptionRepository, 'getPlanById').mockResolvedValue(plan);
      jest
        .spyOn(pagbankRepository, 'getPlanById')
        .mockResolvedValue(pagbankPlan);

      const dto = new CreateSubscriptionDto();
      dto.userId = '1';

      const result = await service['startPayment'](
        PagBank.PaymentType.Subscription,
        dto,
      );

      expect(result).toEqual({
        body: expect.any(PagBank.SubscriptionDTO),
        pagbankPlan,
        contractor,
        plan,
        success: true,
      });
    });
  });
});
