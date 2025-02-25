import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { CreateContractorSpecialityDto } from './dto/create-contractor-speciality.dto';

@Controller('contractor')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) { }

  @Post()
  async create(@Body() createContractorDto: CreateContractorDto) {
  try {
    let specialities = createContractorDto.specialities;
    delete createContractorDto.specialities;
    createContractorDto.active = true;
    let contractor= await this.
        contractorService.create(createContractorDto);
  
        specialities.forEach(async spec=>{
          let contractorSpeciality:CreateContractorSpecialityDto={
            speciality:spec,
            contractor:contractor
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

  @Delete('/speciality')
  removeContractorSpeciality(@Body() createContractorSpecialityDto: CreateContractorSpecialityDto) {
    return this.contractorService.addContractorSpeciliaty(createContractorSpecialityDto);
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContractorDto: UpdateContractorDto) {
    return this.contractorService.update(id, updateContractorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractorService.remove(id);
  }
}
