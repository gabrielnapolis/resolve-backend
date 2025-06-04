import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Repository } from 'typeorm';
import { Work } from './entities/work.entity';

@Injectable()
export class WorksService {
  constructor(
    @Inject('WORK_REPOSITORY')
    private workRepository: Repository<Work>,
  ) {}

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    const work = this.workRepository.create(createWorkDto);
    return await this.workRepository.save(work);
  }

  async findAll(): Promise<Work[]> {
    return await this.workRepository.find();
  }

  async findOne(id: string): Promise<Work> {
    return await this.workRepository.findOneBy({ id });
  }

  async update(id: string, updateWorkDto: UpdateWorkDto): Promise<Work> {
    await this.workRepository.update(id, updateWorkDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.workRepository.delete(id);
  }
}
