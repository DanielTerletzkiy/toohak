import { Test, TestingModule } from '@nestjs/testing';
import { UserAnsweresService } from './user-answeres.service';

describe('UserAnsweresService', () => {
  let service: UserAnsweresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnsweresService],
    }).compile();

    service = module.get<UserAnsweresService>(UserAnsweresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
