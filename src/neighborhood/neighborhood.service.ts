import { Injectable } from '@nestjs/common';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';

@Injectable()
export class NeighborhoodService {
  create(createNeighborhoodDto: CreateNeighborhoodDto) {
    return 'This action adds a new neighborhood';
  }

  findAll() {
    return `This action returns all neighborhood`;
  }

  findOne(id: number) {
    return `This action returns a #${id} neighborhood`;
  }

  update(id: number, updateNeighborhoodDto: UpdateNeighborhoodDto) {
    return `This action updates a #${id} neighborhood`;
  }

  remove(id: number) {
    return `This action removes a #${id} neighborhood`;
  }
}
