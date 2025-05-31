import { DataSource } from 'typeorm';
import { Rating } from './entities/rating.entity';


export const ratingsProviders = [
  {
    provide: 'RATINGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rating),
    inject: ['DATA_SOURCE'],
  },

];