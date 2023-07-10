import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { QuestionApiService } from './import-question/question-api/question-api.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nameService: NameGeneratorService,
    private readonly importQuestion: QuestionApiService
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  get(): string {
    return this.nameService.generateName();
  }

  @Get('/questions')
  async getQuestions(): Promise<any> {
    const questions = await this.importQuestion.getQuestions();
    return questions;
  }

  @Get('/questions/:id')
  async getQuestion(@Param('id') id: string): Promise<any> {
    console.log(id);
    const question = await this.importQuestion.getQuestionById(id);
    return question;
  }
}
