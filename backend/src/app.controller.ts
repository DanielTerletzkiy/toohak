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
}
