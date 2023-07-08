import { Test, TestingModule } from '@nestjs/testing';
import { NameGeneratorService } from './name-generator.service';

describe('NamegeneratorService', () => {
  let service: NameGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameGeneratorService],
    }).compile();

    service = module.get<NameGeneratorService>(NameGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
