import { Answer } from 'shared/enums/Answer';
import { Question } from '../entities/question.entity';

export class CreateQuestionDto implements Partial<Question> {
  id: string;
  questionText: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: Answer;
}
