import { Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/import')
  async getQuestions(): Promise<any> {
    const questions = await this.questionsService.import();
    return questions;
  }

  @Get('/import/:id')
  async getQuestion(@Param('id') id: string): Promise<any> {
    const question = await this.questionsService.getApiQuestionById(id);
    return question;
  }
}
