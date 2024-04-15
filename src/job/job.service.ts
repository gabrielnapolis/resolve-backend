import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {

  constructor(
    @Inject('JOB_REPOSITORY')
    private jobRepository: Repository<Job>,
  ) {}
  create(createClientDto: CreateJobDto) {
    this.jobRepository.save(createClientDto)
   }
 
   findAll() {
    this.jobRepository.find()
   }
 
   findOne(id: string) {
     this.jobRepository.findOneBy({id:id})
   }
 
   update(id: string, updateClientDto: UpdateJobDto) {
     this.jobRepository.update({id:id},updateClientDto)
   }
 
   remove(id: string) {
    // this.clientRepository.remove()
   }
}
