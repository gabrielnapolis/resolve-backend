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
  create(createWorkDto: CreateWorkDto) {
    return 'This action adds a new work';
  }

  findAll() {
    return `This action returns all works`;
  }

  findOne(id: number) {
    return `This action returns a #${id} work`;
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
