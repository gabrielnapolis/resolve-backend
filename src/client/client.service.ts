import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: string) {
    this.clientRepository.findOneBy({ id: id });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    this.clientRepository.update({ id: id }, updateClientDto);
  }

  remove(id: string) {
    // this.clientRepository.remove()
  }
}
