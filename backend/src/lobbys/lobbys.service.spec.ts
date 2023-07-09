import { Test, TestingModule } from '@nestjs/testing';
import { LobbysService } from './lobbys.service';

describe('LobbysService', () => {
  let service: LobbysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbysService],
    }).compile();

    service = module.get<LobbysService>(LobbysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
