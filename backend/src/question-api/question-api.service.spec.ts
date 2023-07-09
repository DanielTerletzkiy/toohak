import { Test, TestingModule } from '@nestjs/testing';
import { QuestionApiService } from './question-api.service';

describe('QuestionApiService', () => {
  let service: QuestionApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionApiService],
    }).compile();

    service = module.get<QuestionApiService>(QuestionApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
