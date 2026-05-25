import { GoogleGenerativeAI } from '@google/generative-ai';
import { IGeneratedPaper, IQuestionType } from '../models/Assignment';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function buildPrompt(
  questionTypes: IQuestionType[],
  additionalInstructions: string,
  totalQuestions: number,
  totalMarks: number
): string {
  const qtList = questionTypes
    .map((qt) => `- ${qt.type}: ${qt.count} question(s), ${qt.marks} mark(s) each`)
    .join('\n');

  const topic = additionalInstructions.trim() || 'General Science for Grade 8';

  return `You are an expert teacher creating a question paper. Generate a complete, high-quality question paper based on these requirements.

Topic/Instructions: ${topic}
Total Questions: ${totalQuestions}
Total Marks: ${totalMarks}

Question breakdown:
${qtList}

IMPORTANT: Return ONLY valid JSON — no markdown, no explanation, no code blocks. Strictly follow this schema:

{
  "paperTitle": "Question Paper",
  "subject": "<infer subject from topic>",
  "className": "<infer class/grade from topic, e.g., Class 8>",
  "timeAllowed": "<appropriate time, e.g., 45 minutes>",
  "maxMarks": ${totalMarks},
  "generalInstructions": "All questions are compulsory unless stated otherwise.",
  "sections": [
    {
      "sectionName": "Section A",
      "questionType": "<question type name>",
      "instruction": "<e.g., Attempt all questions. Each question carries X marks.>",
      "questions": [
        {
          "questionNumber": 1,
          "questionText": "<full question text>",
          "difficulty": "Easy",
          "marks": <marks per question>,
          "options": ["A. option1", "B. option2", "C. option3", "D. option4"]
        }
      ]
    }
  ],
  "answerKey": [
    { "questionNumber": 1, "answer": "<answer>" }
  ]
}

Rules:
- Create one section per question type (Section A, B, C, ...)
- difficulty must be exactly "Easy", "Moderate", or "Hard"
- Include options array ONLY for Multiple Choice Questions, leave it empty [] for others
- Make questions relevant to the topic/subject
- Vary difficulty — roughly 40% Easy, 40% Moderate, 20% Hard
- Ensure question count per section matches the requirements exactly
- answerKey must have answers for every question across all sections
- Return ONLY the JSON object, nothing else`;
}

function buildMockPaper(
  questionTypes: IQuestionType[],
  additionalInstructions: string,
  totalMarks: number
): IGeneratedPaper {
  const topic = additionalInstructions.trim() || 'General Science';
  const sections = questionTypes.map((qt, si) => {
    const sectionName = `Section ${String.fromCharCode(65 + si)}`;
    const difficulties: Array<'Easy' | 'Moderate' | 'Hard'> = ['Easy', 'Moderate', 'Hard'];
    const questions = Array.from({ length: qt.count }, (_, qi) => ({
      questionNumber: qi + 1,
      questionText: `[${qt.type}] Sample question ${qi + 1} related to: ${topic}. What is the correct explanation for this concept?`,
      difficulty: difficulties[qi % 3],
      marks: qt.marks,
      options:
        qt.type === 'Multiple Choice Questions'
          ? ['A. First option', 'B. Second option', 'C. Third option', 'D. Fourth option']
          : [],
    }));
    return {
      sectionName,
      questionType: qt.type,
      instruction: `Attempt all questions. Each question carries ${qt.marks} mark(s).`,
      questions,
    };
  });

  const allQuestions = sections.flatMap((s) => s.questions);
  return {
    paperTitle: 'Question Paper',
    subject: topic.split(' ').slice(0, 3).join(' '),
    className: 'Class 8',
    timeAllowed: '45 minutes',
    maxMarks: totalMarks,
    generalInstructions: 'All questions are compulsory unless stated otherwise.',
    sections,
    answerKey: allQuestions.map((q) => ({
      questionNumber: q.questionNumber,
      answer: q.options?.[0] ? 'A. First option' : 'Sample answer for this question.',
    })),
  };
}

export async function generateQuestionPaper(
  questionTypes: IQuestionType[],
  additionalInstructions: string,
  totalQuestions: number,
  totalMarks: number
): Promise<IGeneratedPaper> {
  // Dev mock mode — set USE_MOCK=true in .env to bypass Gemini during testing
  if (process.env.USE_MOCK === 'true') {
    await new Promise((r) => setTimeout(r, 2000)); // simulate latency
    return buildMockPaper(questionTypes, additionalInstructions, totalMarks);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = buildPrompt(questionTypes, additionalInstructions, totalQuestions, totalMarks);

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const jsonText = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  let parsed: IGeneratedPaper;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(`Failed to parse Gemini response as JSON: ${jsonText.substring(0, 200)}`);
  }

  return parsed;
}
