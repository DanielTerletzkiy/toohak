import { Test, TestingModule } from '@nestjs/testing';
import { AnswerShuffleService } from './answer-shuffle.service';

describe('AnswerShuffleService', () => {
  let service: AnswerShuffleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerShuffleService],
    }).compile();

    service = module.get<AnswerShuffleService>(AnswerShuffleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
