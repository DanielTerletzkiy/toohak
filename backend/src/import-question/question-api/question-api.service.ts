import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Question } from 'src/questions/entities/question.entity';
import { AnswerShuffleService } from '../answer-shuffle/answer-shuffle.service';

interface TriviaQuestion {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

@Injectable()
export class QuestionApiService {
  constructor(private http: HttpService,
    private shuffleService: AnswerShuffleService) { }

  async getQuestions(): Promise<Question[]> {
    const response = await this.http
      .get<TriviaQuestion[]>('https://the-trivia-api.com/v2/questions')
      .toPromise();
    const responseData = response.data;
    const questions = responseData.map((question) =>
      this.mapTriviaQuestionToQuestion(question),
    );
    return questions;
  }

  async getQuestionById(id: string): Promise<Question> {
    const response = await this.http
      .get<TriviaQuestion>('https://the-trivia-api.com/v2/question/' + id)
      .toPromise();
    const responseData = response.data;
    const question = this.mapTriviaQuestionToQuestion(responseData);
    return question;
  }

  private mapTriviaQuestionToQuestion(triviaQuestion: TriviaQuestion): Question {
    let answers = triviaQuestion.incorrectAnswers.concat(triviaQuestion.correctAnswer);
    let question = new Question();
    question.id = triviaQuestion.id;
    question.questionText = triviaQuestion.question.text;
    this.shuffleService.shuffle(answers, triviaQuestion.correctAnswer, question);
    return question;
  }
}
