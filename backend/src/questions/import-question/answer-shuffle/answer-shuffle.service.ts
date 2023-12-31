import { Injectable } from '@nestjs/common';
import { Answer } from '../../../../shared/enums/Answer';
import { Question } from '../../entities/question.entity';

@Injectable()
export class AnswerShuffleService {
  shuffle(answers: string[], correct: string, question: Question): void {
    // Shuffle the answers and assign the shuffled answers to the variables a, b, c, d
    const shuffledAnswers = this.shuffleArray([...answers]);
    const [a, b, c, d] = shuffledAnswers;
    const correctAnswer = this.findCorrectAnswer(a, b, c, d, correct);

    question.a = a;
    question.b = b;
    question.c = c;
    question.d = d;
    question.correctAnswer = correctAnswer;
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Switch value at i with value at j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private findCorrectAnswer(
    a: string,
    b: string,
    c: string,
    d: string,
    answerString: string,
  ): Answer | null {
    switch (answerString) {
      case a:
        return Answer.A;
      case b:
        return Answer.B;
      case c:
        return Answer.C;
      case d:
        return Answer.D;
      default:
        return null;
    }
  }
}
