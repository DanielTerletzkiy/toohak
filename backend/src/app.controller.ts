import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { ImportQuestionService } from './import-question/import-question.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nameService: NameGeneratorService,
    private readonly importQuestion: ImportQuestionService
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  get(): string {
    return this.nameService.generateName();
  }

  @Get('/questions/import')
  async getQuestions(): Promise<any> {
    const questions = await this.importQuestion.importQuestions();
    return questions;
  }

  @Get('/questions/:id')
  async getQuestion(@Param('id') id: string): Promise<any> {
    const question = await this.importQuestion.getQuestionById(id);
    return question;
  }
}
