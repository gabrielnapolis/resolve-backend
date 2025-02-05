import { Inject, Injectable } from '@nestjs/common';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { Contractor } from './entities/contractor.entity';
import { Repository } from 'typeorm';
import { ContractorSpeciality } from './entities/contractorSpeciality.entity';
import { CreateContractorSpecialityDto } from './dto/create-contractor-speciality.dto';
import { Speciality } from '../speciality/entities/speciality.entity';

@Injectable()
export class ContractorService {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY')
    private contractorRepository: Repository<Contractor>,
    @Inject('CONTRACTOR_SPECIALITY_REPOSITORY')
    private contractorSpeciliatyRepository: Repository<ContractorSpeciality>,
  ) {}

  async create(createContractorDto: CreateContractorDto) {
    try {
      return this.contractorRepository.save(createContractorDto);
    } catch (error) {
      console.log(error);
    }
  }

  async search(args: any) {
    console.log(args);
    let contractors = await this.contractorRepository
      .createQueryBuilder('contractor')
      .innerJoinAndSelect('contractor.specialities', 'speciliaties')
      .innerJoinAndSelect('speciliaties.speciality', 'speciality')
      .where('speciality.id = :id', { id: args.speciality })
      .getMany();
    console.log(contractors);
    return contractors;
  }

  async refinedSearch(args: any) {
    console.log(args);
    let contractors = await this.contractorRepository
      .createQueryBuilder('contractor')
      .innerJoinAndSelect('contractor.specialities', 'speciliaties')
      .innerJoinAndSelect('speciliaties.speciality', 'speciality')
      .where('speciality.id = :id', { id: args.speciality })
      .where('contractor.region = :region', { region: args.region })
      .getMany();
    console.log(contractors);
    return contractors;
  }

  findAll() {
    return this.contractorRepository
      .createQueryBuilder('contractor')
      .innerJoinAndSelect('contractor.specialities', 'speciliaties')
      .innerJoinAndSelect('speciliaties.speciality', 'speciality')
      .getMany();
  }

  async findOne(id: string) {
    let contractor = await this.contractorRepository
      .createQueryBuilder('contractor')
      .innerJoinAndSelect('contractor.specialities', 'speciliaties')
      .innerJoinAndSelect('speciliaties.speciality', 'speciality')
      .where('contractor.id = :id', { id: id })
      .getOne();
    console.log(contractor);
    return contractor;
  }

  update(id: string, updateContractorDto: UpdateContractorDto) {
    return this.contractorRepository.update({ id: id }, updateContractorDto);
  }

  remove(id: string) {
    return this.contractorRepository.delete({ id: id });
  }
  
  async addContractorSpeciliaty(
    createContractorSpecilityDto: CreateContractorSpecialityDto,
  ) {
    try {
      return await this.contractorSpeciliatyRepository.save(
        createContractorSpecilityDto,
      );
    } catch (error) {
      console.log(error);
    }
  }
  
  async searchContractorBySpeciliaty(specialityId: string) {
    let contractors = await this.contractorSpeciliatyRepository
      .createQueryBuilder('contractorSpeciliaty')
      .innerJoinAndSelect('contractorSpeciliaty.contractor', 'contractor')
      .innerJoinAndSelect('contractorSpeciliaty.speciality', 'speciality')
      .where('speciality.id = :id', { id: specialityId })
      .getMany();
    console.log(contractors);
    return contractors;
  }

  listSpeciliatyByContractor(contractorId: string) {
    try {
      this.contractorSpeciliatyRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
}
