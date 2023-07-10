import { Injectable } from '@nestjs/common';
import { QuestionApiService } from './question-api/question-api.service';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class ImportQuestionService {
    constructor(private questionApiService: QuestionApiService,
        private questionsService: QuestionsService) {}

    async importQuestions() {
        const questions = await this.questionApiService.getQuestions();
        
        questions.forEach((question: Question) => {
            this.questionsService.create(question);
        });

        return questions;
    }

    async getQuestionById(id: string) {
        return this.questionApiService.getQuestionById(id);
    }
}
