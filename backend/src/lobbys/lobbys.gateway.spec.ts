import { Test, TestingModule } from '@nestjs/testing';
import { LobbysGateway } from './lobbys.gateway';
import { LobbysService } from './lobbys.service';

describe('LobbysGateway', () => {
  let gateway: LobbysGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbysGateway, LobbysService],
    }).compile();

    gateway = module.get<LobbysGateway>(LobbysGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
