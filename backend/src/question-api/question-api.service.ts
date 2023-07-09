import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

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

  // TODO: Replace with real Entity
  interface Question {
    id: string;
    correctAnswer: string;
    answers: string[];
    question: string;
  }

  function mapTriviaQuestionToQuestion(triviaQuestion: TriviaQuestion): Question {
    return {
      id: triviaQuestion.id,
      correctAnswer: triviaQuestion.correctAnswer,
      answers: [triviaQuestion.correctAnswer, ...triviaQuestion.incorrectAnswers],
      question: triviaQuestion.question.text,
    };
  }

@Injectable()
export class QuestionApiService {
    constructor(private http: HttpService) {}

    async getQuestions() {
        const response = await this.http.get<TriviaQuestion[]>('https://the-trivia-api.com/v2/questions').toPromise();
        const responseData = response.data;
        const questions = responseData.map((question) => mapTriviaQuestionToQuestion(question));
        return questions;
    }

    async getQuestionById(id: string) {
        const response = await this.http.get<TriviaQuestion>('https://the-trivia-api.com/v2/question/' + id).toPromise();
        const responseData = response.data;
        const question = mapTriviaQuestionToQuestion(responseData);
        return question;
    }

    
}
