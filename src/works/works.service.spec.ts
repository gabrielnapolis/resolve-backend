import { Test, TestingModule } from '@nestjs/testing';
import { WorksService } from './works.service';

describe('WorksService', () => {
  let service: WorksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorksService],
    }).compile();

    service = module.get<WorksService>(WorksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
let service: WorksService;
let workRepository: {
  create: jest.Mock,
  save: jest.Mock,
  find: jest.Mock,
  findOneBy: jest.Mock,
  update: jest.Mock,
  delete: jest.Mock,
};

beforeEach(async () => {
  workRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      WorksService,
      { provide: 'WORK_REPOSITORY', useValue: workRepository },
    ],
  }).compile();

  service = module.get<WorksService>(WorksService);
});

it('should be defined', () => {
  expect(service).toBeDefined();
});

describe('create', () => {
  it('should create and save a work', async () => {
    const dto = { title: 'Test' };
    const created = { ...dto };
    const saved = { id: '1', ...dto };
    workRepository.create.mockReturnValue(created);
    workRepository.save.mockResolvedValue(saved);

    const result = await service.create(dto as any);

    expect(workRepository.create).toHaveBeenCalledWith(dto);
    expect(workRepository.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(saved);
  });
});

describe('findAll', () => {
  it('should return all works', async () => {
    const works = [{ id: '1' }, { id: '2' }];
    workRepository.find.mockResolvedValue(works);

    const result = await service.findAll();

    expect(workRepository.find).toHaveBeenCalled();
    expect(result).toEqual(works);
  });
});

describe('findOne', () => {
  it('should return a work by id', async () => {
    const work = { id: '1' };
    workRepository.findOneBy.mockResolvedValue(work);

    const result = await service.findOne('1');

    expect(workRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(work);
  });
});

describe('update', () => {
  it('should update and return the updated work', async () => {
    const id = '1';
    const dto = { title: 'Updated' };
    const updatedWork = { id, ...dto };
    workRepository.update.mockResolvedValue(undefined);
    workRepository.findOneBy.mockResolvedValue(updatedWork);

    const result = await service.update(id, dto as any);

    expect(workRepository.update).toHaveBeenCalledWith(id, dto);
    expect(workRepository.findOneBy).toHaveBeenCalledWith({ id });
    expect(result).toEqual(updatedWork);
  });
});

describe('remove', () => {
  it('should delete a work by id', async () => {
    workRepository.delete.mockResolvedValue(undefined);

    await service.remove(1);

    expect(workRepository.delete).toHaveBeenCalledWith(1);
  });
});
