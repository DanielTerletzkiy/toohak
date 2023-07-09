import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { AnswerShuffleService } from './answer-shuffle/answer-shuffle.service';
import { QuestionApiService } from './question-api/question-api.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly nameService: NameGeneratorService,
              private readonly shuffleService: AnswerShuffleService,
              private readonly questionApi: QuestionApiService
              ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get()
  get(): string {
    return this.nameService.generateName();
  }

  @Get('/shuffle')
  getShuffle(): any {
    let answers = ['apple', 'banana', 'cherry', 'durian'];
    return this.shuffleService.shuffle(answers,'cherry');
  }

  @Get('/questions')
  async getQuestions(): Promise<any> {
    const questions = await this.questionApi.getQuestions();
    // return this.shuffleService.shuffle(questions[0].answers,questions[0].correctAnswer);
    return questions;
  }

  @Get('/questions/:id')
  async getQuestion(@Param('id') id: string): Promise<any> {
    console.log(id);
    const question = await this.questionApi.getQuestionById(id);
    return question;
  }
}
