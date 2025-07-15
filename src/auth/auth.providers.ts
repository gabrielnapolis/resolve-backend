import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Subscription } from 'src/payment/entities/subscription.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export const authProviders = [

    {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBSCRIPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Subscription),
    inject: ['DATA_SOURCE'],
  },
];
