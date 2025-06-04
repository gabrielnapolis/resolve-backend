
import { DataSource } from 'typeorm';
import { Contractor } from '../contractor/entities/contractor.entity';
import { Client } from 'src/client/entities/client.entity';

import { Speciality } from '../speciality/entities/speciality.entity';
import { ContractorSpeciality } from 'src/contractor/entities/contractorSpeciality.entity';
import { Subscription } from 'src/payment/entities/subscription.entity';
import { Plan } from 'src/payment/entities/plan.entity';
import { Work } from 'src/works/entities/work.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'ADMIN',
        database: 'contractor',
        entities: [
         Contractor,
         Client,
         ContractorSpeciality,
         Speciality,
         Plan,
         Subscription,
         Work
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];