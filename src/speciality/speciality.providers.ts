import { DataSource } from 'typeorm';
import { Speciality } from './entities/speciality.entity';


export const specialityProviders = [
  {
    provide: 'SPECIALITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Speciality),
    inject: ['DATA_SOURCE'],
  },
];