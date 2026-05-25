'use client';
import { QuestionType } from '@/types';

const QUESTION_TYPE_OPTIONS = [
  'Multiple Choice Questions',
  'Short Questions',
  'Long Answer Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'True/False Questions',
  'Fill in the Blanks',
  'Match the Following',
];

interface Props {
  row: QuestionType;
  index: number;
  onChange: (index: number, field: keyof QuestionType, value: string | number) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-0 rounded-full border border-gray-200 overflow-hidden bg-white h-9 w-28">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg leading-none flex-shrink-0"
      >
        −
      </button>
      <span className="flex-1 text-center text-sm font-semibold text-gray-800 select-none">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg leading-none flex-shrink-0"
      >
        +
      </button>
    </div>
  );
}

export default function QuestionTypeRow({ row, index, onChange, onRemove, canRemove }: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* Dropdown */}
      <div className="relative flex-1">
        <select
          value={row.type}
          onChange={(e) => onChange(index, 'type', e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400 text-gray-700 pr-9 cursor-pointer hover:border-gray-300 transition-colors h-10"
        >
          {QUESTION_TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0"
        title="Remove"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Count stepper */}
      <Stepper value={Number(row.count) || 1} onChange={(v) => onChange(index, 'count', v)} />

      {/* Marks stepper */}
      <Stepper value={Number(row.marks) || 1} onChange={(v) => onChange(index, 'marks', v)} />
    </div>
  );
}
