import { Question } from '../entities/question.entity';
import { Answer } from 'shared/enums/Answer';

export class UpdateQuestionDto implements Partial<Question> {
    id:string;
    questionText:string;
    a:string;
    b:string;
    c:string;
    d:string;
    correctAnswer:Answer;
}
