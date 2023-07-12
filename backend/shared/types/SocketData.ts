import { Answer } from '../enums/Answer';
import { Question } from '../../src/questions/entities/question.entity';
import { Lobby } from '../../src/lobbies/entities/lobby.entity';

export type QuestionChangePlayer = {
  id: string;
  questionText: string;
};

export type QuestionChangeHost = {
  id: string;
  questionText: string;
  correctAnswer: Answer;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};

export type SubmitData = {
  chosenAnswer: Answer;
  questionId: Question['id'];
};
