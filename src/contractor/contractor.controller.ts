import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { CreateContractorSpecialityDto } from './dto/create-contractor-speciality.dto';
import { JwtAuthGuard } from 'src/auth/guard/passport-auth.guard';
import { EmailService } from 'src/shared/email.service';

@Controller('contractor')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService,
    private readonly emailService: EmailService
  ) { }

  @Post()
  async create(@Body() createContractorDto: CreateContractorDto) {
    try {
      let specialities = createContractorDto.specialities;
      delete createContractorDto.specialities;
      createContractorDto.active = true;
      createContractorDto.login = createContractorDto.email;
      let contractor = await this.
        contractorService.create(createContractorDto);

      specialities.forEach(async spec => {
        let contractorSpeciality: CreateContractorSpecialityDto = {
          speciality: spec,
          contractor: contractor
        }
        let specSaved = await this.contractorService.addContractorSpeciliaty(contractorSpeciality)
        console.log(specSaved)
      })
      return contractor
    } catch (error) {
      return error
    }
  }

  @Post('/speciality')
  addSpeciality(@Body() createContractorSpecialityDto: CreateContractorSpecialityDto) {
    try {
      return this.contractorService.addContractorSpeciliaty(createContractorSpecialityDto);
    } catch (error) {
      return error
    }

  }

  @UseGuards(JwtAuthGuard)
  @Delete('/speciality')
  removeContractorSpeciality(@Body() id: string) {
    return this.contractorService.removeContractorSpeciliaty(id);
  }

  @Post('/search/specility')
  searchBySpeciality(@Body() args: any) {
    try {
      return this.contractorService.search(args);
    } catch (error) {
      return error
    }
  }

  @Post('/search')
  async refinedSearch(@Body() args: any) {
    try {
      let contractors = await this.contractorService.search(args);
      console.log(contractors)
      return contractors
    } catch (error) {
      return error
    }
  }

  @Get()
  findAll() {
    return this.contractorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contractorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateContractorDto: UpdateContractorDto) {
    return this.contractorService.update(id, updateContractorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractorService.remove(id);
  }

  @Post('/password')
  async changePassword(@Body() args: { id: string; password: string }) {
    try {
      return await this.contractorService.changePassword(args.id, args.password);
    } catch (error) {
      return error;
    }
  }

  @Post('/password')
  async resetPassword(@Body() args: { id: string }) {
    const char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const ind = Math.floor(Math.random() * char.length);
      password += char[ind];
    }
    try {
      this.emailService.sendEmail(
        args.id,
        'Redefinição de Senha',
        `Sua nova senha é: ${password}`,
      );
      return await this.contractorService.changePassword(args.id, password);
    } catch (error) {
      return error;
    }
  }
}
