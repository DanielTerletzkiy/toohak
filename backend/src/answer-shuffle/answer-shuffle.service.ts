import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerShuffleService {

  shuffle(answers: string[], correct: string): { a: string; b: string; c: string; d: string; correctAnswer: string } {
    // Shuffle the answers and assign the shuffled answers to the variables a, b, c, d
    const shuffledAnswers = this.shuffleArray([...answers]);
    const [a, b, c, d] = shuffledAnswers;
    const correctAnswer = this.findCorrectAnswer(a, b, c, d, correct);
    
    return { a, b, c, d, correctAnswer };
  }
    
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Switch value at i with value at j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
    
  private findCorrectAnswer(a: string, b: string, c: string, d: string, answerString: string): any {
    switch (answerString) {
      case a:
        return 'a';
      case b: 
        return 'b';
      case c:
        return 'c';
      case d:
        return 'd';
      default:
        return null;
    }
  }
}
