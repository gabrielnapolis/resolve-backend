import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ContractorService } from '../contractor/contractor.service';
import { JwtService } from '@nestjs/jwt';
import { SubscriptionRepository } from '../payment/repository/subscription.repository';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        ContractorService,
        JwtService,
        SubscriptionRepository,
        {
          provide: 'CONTRACTOR_REPOSITORY',
          useValue: {},
        },
        {
          provide: 'CONTRACTOR_SPECIALITY_REPOSITORY',
          useValue: {},
        },
        {
          provide: 'SUBSCRIPTION_REPOSITORY',
          useValue: {},
        },
        {
          provide: 'SubscriptionRepository',
          useValue: {},
        },
        {
          provide: 'PLAN_REPOSITORY',
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
