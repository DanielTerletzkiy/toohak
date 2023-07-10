import { Injectable } from '@nestjs/common';
import { QuestionApiService } from './question-api/question-api.service';

@Injectable()
export class ImportQuestionService {
    constructor(private questionApiService: QuestionApiService) {}

    async importQuestions() {
        return await this.questionApiService.getQuestions();
    }

    async getQuestionById(id: string) {
        return this.questionApiService.getQuestionById(id);
    }
}
