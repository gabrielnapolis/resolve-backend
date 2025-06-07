import { Test, TestingModule } from '@nestjs/testing';
import { ContractorController } from './contractor.controller';
import { ContractorService } from './contractor.service';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../shared/email.service';
import { JwtAuthGuard } from '../auth/guard/passport-auth.guard';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { CreateContractorSpecialityDto } from './dto/create-contractor-speciality.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

describe('ContractorController', () => {
  let controller: ContractorController;
  let contractorService: ContractorService;
  let emailService: EmailService;

  beforeEach(async () => {
    const mockContractorService = {
      create: jest.fn().mockResolvedValue({ id: '1', name: 'Test Contractor' }),
      addContractorSpeciliaty: jest.fn().mockResolvedValue({ id: 'spec1' }),
      removeContractorSpeciliaty: jest.fn().mockResolvedValue(true),
      search: jest.fn().mockResolvedValue([{ id: '1' }]),
      findAll: jest.fn().mockResolvedValue([{ id: '1' }]),
      findOne: jest.fn().mockResolvedValue({ id: '1' }),
      update: jest.fn().mockResolvedValue({ id: '1', name: 'Updated' }),
      remove: jest.fn().mockResolvedValue(true),
      changePassword: jest.fn().mockResolvedValue(true),
    };
    const mockEmailService = {
      sendEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractorController],
      providers: [
        { provide: ContractorService, useValue: mockContractorService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: AuthService, useValue: {} },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    controller = module.get<ContractorController>(ContractorController);
    contractorService = module.get<ContractorService>(ContractorService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create a contractor', async () => {
  //   const dto: any = {
  //     email: 'test@test.com',
  //     specialities: ['spec1', 'spec2'],
  //   };
  //   const result = await controller.create(dto);
  //   expect(contractorService.create).toHaveBeenCalled();
  //   expect(result).toHaveProperty('id');
  // });

  // it('should add a speciality', async () => {
  //   const dto: CreateContractorSpecialityDto = {
  //     speciality: { id: 1, fullname: 'Spec1' } as any,
  //     contractor: { id: '1' } as any,
  //   };
  //   const result = await controller.addSpeciality(dto);
  //   expect(contractorService.addContractorSpeciliaty).toHaveBeenCalledWith(dto);
  //   expect(result).toHaveProperty('id', 'spec1');
  // });

  // it('should remove a contractor speciality', async () => {
  //   const id = 'spec1';
  //   const result = await controller.removeContractorSpeciality(id);
  //   expect(contractorService.removeContractorSpeciliaty).toHaveBeenCalledWith(
  //     id,
  //   );
  //   expect(result).toBe(true);
  // });

  // it('should search by speciality', async () => {
  //   const args = { speciality: 'spec1' };
  //   const result = await controller.searchBySpeciality(args);
  //   expect(contractorService.search).toHaveBeenCalledWith(args);
  //   expect(result).toEqual([{ id: '1' }]);
  // });

  // it('should refined search', async () => {
  //   const args = { name: 'Test' };
  //   const result = await controller.refinedSearch(args);
  //   expect(contractorService.search).toHaveBeenCalledWith(args);
  //   expect(result).toEqual([{ id: '1' }]);
  // });

  // it('should find all contractors', async () => {
  //   const result = await controller.findAll();
  //   expect(contractorService.findAll).toHaveBeenCalled();
  //   expect(result).toEqual([{ id: '1' }]);
  // });

  // it('should find one contractor', async () => {
  //   const result = await controller.findOne('1');
  //   expect(contractorService.findOne).toHaveBeenCalledWith('1');
  //   expect(result).toEqual({ id: '1' });
  // });

  // it('should update a contractor', async () => {
  //   const dto: UpdateContractorDto = { name: 'Updated' } as any;
  //   const result = await controller.update('1', dto);
  //   expect(contractorService.update).toHaveBeenCalledWith('1', dto);
  //   expect(result).toEqual({ id: '1', name: 'Updated' });
  // });

  // it('should remove a contractor', async () => {
  //   const result = await controller.remove('1');
  //   expect(contractorService.remove).toHaveBeenCalledWith('1');
  //   expect(result).toBe(true);
  // });

  // it('should change password', async () => {
  //   const args = { id: '1', password: 'newpass' };
  //   const result = await controller.changePassword(args);
  //   expect(contractorService.changePassword).toHaveBeenCalledWith(
  //     '1',
  //     'newpass',
  //   );
  //   expect(result).toBe(true);
  // });

  // it('should reset password and send email', async () => {
  //   // Mock Math.random and Math.floor for predictable password
  //   jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  //   jest.spyOn(global.Math, 'floor').mockImplementation((n) => Math.floor(n));
  //   const args = { id: '1' };
  //   // Patch the controller to fix the missing "length" variable in resetPassword
  //   (global as any).length = 8;
  //   const result = await controller.resetPassword(args);
  //   expect(emailService.sendEmail).toHaveBeenCalled();
  //   expect(contractorService.changePassword).toHaveBeenCalled();
  //   // Clean up
  //   delete (global as any).length;
  //   (global.Math.random as jest.MockedFunction<any>).mockRestore();
  //   (global.Math.floor as jest.MockedFunction<any>).mockRestore();
  // });
});
