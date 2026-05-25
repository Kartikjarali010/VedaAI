export interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

export interface Question {
  questionNumber: number;
  questionText: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  marks: number;
  options?: string[];
}

export interface Section {
  sectionName: string;
  questionType: string;
  instruction: string;
  questions: Question[];
}

export interface GeneratedPaper {
  paperTitle: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  generalInstructions: string;
  sections: Section[];
  answerKey: { questionNumber: number; answer: string }[];
}

export interface Assignment {
  _id: string;
  title: string;
  dueDate?: string;
  questionTypes: QuestionType[];
  totalQuestions: number;
  totalMarks: number;
  additionalInstructions: string;
  fileName?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  generatedPaper?: GeneratedPaper;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Hard';
