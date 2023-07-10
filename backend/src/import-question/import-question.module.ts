import { Module } from '@nestjs/common';
import { ImportQuestionService } from './import-question.service';
import { HttpModule } from '@nestjs/axios';
import { AnswerShuffleService } from './answer-shuffle/answer-shuffle.service';
import { QuestionApiService } from './question-api/question-api.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AnswerShuffleService, QuestionApiService, ImportQuestionService],
  exports: [ImportQuestionService],
})
export class ImportQuestionModule {}
