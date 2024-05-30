export type Question = {
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
};

export type Answer = {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  answer: string;
};

export type Record = {
  id: number;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  answer: string;
};
