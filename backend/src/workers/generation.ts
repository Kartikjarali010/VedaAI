import { Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import { Assignment } from '../models/Assignment';
import { generateQuestionPaper } from '../services/gemini';
import { emitToAssignment } from '../socket/index';

export interface GenerationJobData {
  assignmentId: string;
}

export function startGenerationWorker(): Worker {
  const worker = new Worker<GenerationJobData>(
    'question-generation',
    async (job: Job<GenerationJobData>) => {
      const { assignmentId } = job.data;

      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error(`Assignment ${assignmentId} not found`);

      await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });
      emitToAssignment(assignmentId, 'generation:progress', { status: 'processing', message: 'Generating your question paper...' });

      const paper = await generateQuestionPaper(
        assignment.questionTypes,
        assignment.additionalInstructions,
        assignment.totalQuestions,
        assignment.totalMarks
      );

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: 'completed',
        generatedPaper: paper,
      });

      emitToAssignment(assignmentId, 'generation:complete', {
        assignmentId,
        paper,
      });
    },
    { connection: redis }
  );

  worker.on('failed', async (job, err) => {
    if (!job) return;
    const { assignmentId } = job.data;
    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'failed',
      errorMessage: err.message,
    });
    emitToAssignment(assignmentId, 'generation:error', {
      assignmentId,
      message: 'Failed to generate question paper. Please try again.',
    });
  });

  console.log('Generation worker started');
  return worker;
}
