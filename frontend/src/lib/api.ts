import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export interface CreateAssignmentPayload {
  title: string;
  dueDate?: string;
  questionTypes: { type: string; count: number; marks: number }[];
  additionalInstructions: string;
  file?: File;
}

export async function createAssignment(payload: CreateAssignmentPayload): Promise<{ assignmentId: string }> {
  const formData = new FormData();
  formData.append('title', payload.title);
  if (payload.dueDate) formData.append('dueDate', payload.dueDate);
  formData.append('questionTypes', JSON.stringify(payload.questionTypes));
  formData.append('additionalInstructions', payload.additionalInstructions);
  if (payload.file) formData.append('file', payload.file);

  const { data } = await api.post('/api/assignments', formData);
  return { assignmentId: data.assignmentId };
}

export async function getAssignments() {
  const { data } = await api.get('/api/assignments');
  return data.assignments;
}

export async function getAssignment(id: string) {
  const { data } = await api.get(`/api/assignments/${id}`);
  return data.assignment;
}

export async function deleteAssignment(id: string) {
  await api.delete(`/api/assignments/${id}`);
}
