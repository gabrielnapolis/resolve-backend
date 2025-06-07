import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @Inject('RATINGS_REPOSITORY')
    private ratingRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingRepository.create(createRatingDto);
    return await this.ratingRepository.save(rating);
  }

  async findByContractorId(contractorId: string): Promise<Rating[]> {
    return await this.ratingRepository.findBy({
      contractor: { id: contractorId },
    });
  }

  async findAll(): Promise<Rating[]> {
    return await this.ratingRepository.find();
  }
  async findOne(id: string): Promise<Rating> {
    const rating = await this.ratingRepository.findOneBy({ id });
    if (!rating) {
      throw new Error(`Rating with ID ${id} not found`);
    }
    return rating;
  }
  async update(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    await this.ratingRepository.update(id, updateRatingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ratingRepository.delete(id);
  }
}
