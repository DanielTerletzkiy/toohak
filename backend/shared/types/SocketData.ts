export type QuestionChangePlayer = {
  id: string;
  questionText: string;
};

export type QuestionChangeHost = {
  id: string;
  questionText: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};
