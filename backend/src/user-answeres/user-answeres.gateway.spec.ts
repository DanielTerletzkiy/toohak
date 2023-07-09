import { Test, TestingModule } from '@nestjs/testing';
import { UserAnsweresGateway } from './user-answeres.gateway';
import { UserAnsweresService } from './user-answeres.service';

describe('UserAnsweresGateway', () => {
  let gateway: UserAnsweresGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnsweresGateway, UserAnsweresService],
    }).compile();

    gateway = module.get<UserAnsweresGateway>(UserAnsweresGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
