import { Router, Request, Response } from 'express';
import multer from 'multer';
import { Assignment } from '../models/Assignment';
import { generationQueue } from '../config/queue';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { dueDate, questionTypes, additionalInstructions, title } = req.body;

    const parsedTypes = typeof questionTypes === 'string' ? JSON.parse(questionTypes) : questionTypes;

    const totalQuestions = parsedTypes.reduce((sum: number, qt: { count: number }) => sum + qt.count, 0);
    const totalMarks = parsedTypes.reduce((sum: number, qt: { count: number; marks: number }) => sum + qt.count * qt.marks, 0);

    const assignment = await Assignment.create({
      title: title || `Assignment ${new Date().toLocaleDateString()}`,
      dueDate,
      questionTypes: parsedTypes,
      totalQuestions,
      totalMarks,
      additionalInstructions: additionalInstructions || '',
      fileName: req.file?.originalname,
      status: 'pending',
    });

    await generationQueue.add('generate', { assignmentId: assignment._id.toString() });

    res.status(201).json({ success: true, assignmentId: assignment._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create assignment' });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find({}, { generatedPaper: 0 }).sort({ createdAt: -1 });
    res.json({ success: true, assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignments' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      res.status(404).json({ success: false, message: 'Assignment not found' });
      return;
    }
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignment' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete assignment' });
  }
});

export default router;
