import { DataSource } from 'typeorm';
import { Contractor } from './entities/contractor.entity';
import { ContractorSpeciality } from './entities/contractorSpeciality.entity';


export const contractorProviders = [
  {
    provide: 'CONTRACTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contractor),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CONTRACTOR_SPECIALITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ContractorSpeciality),
    inject: ['DATA_SOURCE'],
  },
];