import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsGateway } from './questions.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsGateway, QuestionsService],
})
export class QuestionsModule {}
