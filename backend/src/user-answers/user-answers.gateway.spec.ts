import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswersGateway } from './user-answers.gateway';
import { UserAnswersService } from './user-answers.service';

describe('UserAnswersGateway', () => {
  let gateway: UserAnswersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswersGateway, UserAnswersService],
    }).compile();

    gateway = module.get<UserAnswersGateway>(UserAnswersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
