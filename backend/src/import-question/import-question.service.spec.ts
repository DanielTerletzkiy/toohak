import { Test, TestingModule } from '@nestjs/testing';
import { ImportQuestionService } from './import-question.service';

describe('ImportQuestionService', () => {
  let service: ImportQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportQuestionService],
    }).compile();

    service = module.get<ImportQuestionService>(ImportQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
