import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  questionNumber: number;
  questionText: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  marks: number;
  options?: string[];
}

export interface ISection {
  sectionName: string;
  questionType: string;
  instruction: string;
  questions: IQuestion[];
}

export interface IGeneratedPaper {
  paperTitle: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  generalInstructions: string;
  sections: ISection[];
  answerKey: { questionNumber: number; answer: string }[];
}

export interface IQuestionType {
  type: string;
  count: number;
  marks: number;
}

export interface IAssignment extends Document {
  title: string;
  dueDate?: string;
  questionTypes: IQuestionType[];
  totalQuestions: number;
  totalMarks: number;
  additionalInstructions: string;
  fileName?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  generatedPaper?: IGeneratedPaper;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionNumber: Number,
  questionText: String,
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] },
  marks: Number,
  options: [String],
});

const SectionSchema = new Schema<ISection>({
  sectionName: String,
  questionType: String,
  instruction: String,
  questions: [QuestionSchema],
});

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    dueDate: String,
    questionTypes: [
      {
        type: { type: String, required: true },
        count: { type: Number, required: true },
        marks: { type: Number, required: true },
      },
    ],
    totalQuestions: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    additionalInstructions: { type: String, default: '' },
    fileName: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    generatedPaper: {
      paperTitle: String,
      subject: String,
      className: String,
      timeAllowed: String,
      maxMarks: Number,
      generalInstructions: String,
      sections: [SectionSchema],
      answerKey: [{ questionNumber: Number, answer: String }],
    },
    errorMessage: String,
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
