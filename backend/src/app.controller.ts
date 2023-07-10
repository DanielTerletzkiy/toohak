import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NameGeneratorService } from './name-generator/name-generator.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nameService: NameGeneratorService,
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
