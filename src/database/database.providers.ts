
import { DataSource } from 'typeorm';
import { Contractor } from '../contractor/entities/contractor.entity';
import { Client } from 'src/client/entities/client.entity';
import { Speciality } from '../speciality/entities/speciality.entity';
import { ContractorSpeciality } from 'src/contractor/entities/contractorSpeciality.entity';
import { Subscription } from 'src/payment/entities/subscription.entity';
import { Plan } from 'src/payment/entities/plan.entity';
import { Work } from 'src/works/entities/work.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/user.entity';
//const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = ;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'resolve',
        entities: [
         Contractor,
         Client,
         ContractorSpeciality,
         Speciality,
         Plan,
         Subscription,
         Work,
         Review,
         User
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];