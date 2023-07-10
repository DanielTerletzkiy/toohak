import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionsController } from './questions.controller';
import { ImportQuestionModule } from './import-question/import-question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), ImportQuestionModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
