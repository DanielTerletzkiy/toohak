import {Answer} from "../enums/Answer";

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
