import { DataSource } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Plan } from './entities/plan.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';

export const paymentProviders = [
  {
    provide: 'SUBSCRIPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Subscription),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PLAN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CONTRACTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Contractor),
    inject: ['DATA_SOURCE'],
  },
];
