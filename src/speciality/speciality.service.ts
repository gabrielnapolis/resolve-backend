import { Inject, Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from './entities/speciality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialityService {
  constructor(
    @Inject('SPECIALITY_REPOSITORY')
    private specialityRepository: Repository<Speciality>,
  ) {}
  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specialityRepository
      .save(createSpecialityDto)
      .then((result) => console.log(result));
  }

  findAll() {
    return this.specialityRepository.find();
  }

  update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialityRepository.update(id, updateSpecialityDto);
  }

  remove(id: string) {
    return this.specialityRepository.delete(id);
  }
}
