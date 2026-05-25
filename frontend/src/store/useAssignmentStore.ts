import { create } from 'zustand';
import { QuestionType, Assignment } from '@/types';

interface CreateFormState {
  title: string;
  dueDate: string;
  questionTypes: QuestionType[];
  additionalInstructions: string;
  file: File | null;
}

interface AssignmentStore {
  assignments: Assignment[];
  formState: CreateFormState;
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  removeAssignment: (id: string) => void;
  setFormTitle: (title: string) => void;
  setFormDueDate: (date: string) => void;
  setFormQuestionTypes: (types: QuestionType[]) => void;
  setFormAdditional: (text: string) => void;
  setFormFile: (file: File | null) => void;
  resetForm: () => void;
}

const defaultForm: CreateFormState = {
  title: '',
  dueDate: '',
  questionTypes: [{ type: 'Multiple Choice Questions', count: 5, marks: 1 }],
  additionalInstructions: '',
  file: null,
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  formState: { ...defaultForm },

  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) =>
    set((state) => ({ assignments: [assignment, ...state.assignments] })),
  removeAssignment: (id) =>
    set((state) => ({ assignments: state.assignments.filter((a) => a._id !== id) })),

  setFormTitle: (title) => set((state) => ({ formState: { ...state.formState, title } })),
  setFormDueDate: (dueDate) => set((state) => ({ formState: { ...state.formState, dueDate } })),
  setFormQuestionTypes: (questionTypes) =>
    set((state) => ({ formState: { ...state.formState, questionTypes } })),
  setFormAdditional: (additionalInstructions) =>
    set((state) => ({ formState: { ...state.formState, additionalInstructions } })),
  setFormFile: (file) => set((state) => ({ formState: { ...state.formState, file } })),
  resetForm: () => set({ formState: { ...defaultForm } }),
}));
