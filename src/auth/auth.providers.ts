import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Subscription } from 'src/payment/entities/subscription.entity';
import { DataSource } from 'typeorm';

export const authProviders = [
  {
    provide: 'CONTRACTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contractor),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBSCRIPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subscription),
    inject: ['DATA_SOURCE'],
  },
];