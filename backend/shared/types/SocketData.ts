export type QuestionChangePlayer = {
  index: number;
  text: string;
};

export type QuestionChangeHost = {
  index: number;
  text: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};
