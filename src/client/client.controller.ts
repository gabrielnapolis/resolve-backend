import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    createClientDto.login = createClientDto.email;
    try {
      return this.clientService.create(createClientDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.clientService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.clientService.findOne(id);
    } catch (error) {}
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      return this.clientService.update(id, updateClientDto);
    } catch (error) {}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.clientService.remove(id);
    } catch (error) {}
  }
}
