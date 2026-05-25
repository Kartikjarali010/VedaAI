'use client';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import QuestionPaper from '@/components/output/QuestionPaper';
import DownloadPDF from '@/components/output/DownloadPDF';
import { getAssignment } from '@/lib/api';
import { useAssignmentSocket } from '@/hooks/useSocket';
import { Assignment, GeneratedPaper } from '@/types';

type PageState = 'loading' | 'processing' | 'completed' | 'failed';

export default function AssignmentOutputPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [paper, setPaper] = useState<GeneratedPaper | null>(null);
  const [state, setState] = useState<PageState>('loading');
  const [progressMsg, setProgressMsg] = useState('Initializing...');

  const fetchAssignment = useCallback(async () => {
    try {
      const a = await getAssignment(id);
      setAssignment(a);
      if (a.status === 'completed' && a.generatedPaper) {
        setPaper(a.generatedPaper);
        setState('completed');
      } else if (a.status === 'failed') {
        setState('failed');
      } else {
        setState('processing');
        setProgressMsg('AI is generating your question paper...');
      }
    } catch {
      setState('failed');
    }
  }, [id]);

  useEffect(() => { fetchAssignment(); }, [fetchAssignment]);

  const onProgress = useCallback((data: { message: string }) => {
    setProgressMsg(data.message);
    setState('processing');
  }, []);

  const onComplete = useCallback((data: { paper: GeneratedPaper }) => {
    setPaper(data.paper);
    setState('completed');
  }, []);

  const onError = useCallback(() => {
    setState('failed');
  }, []);

  useAssignmentSocket(id, onProgress, onComplete, onError);

  const subject = paper?.subject || assignment?.additionalInstructions?.slice(0, 60) || 'your question paper';

  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col">
        <Header title="Create Paper" showBack />
        <main className="flex-1 p-8">
          {/* AI Message Banner */}
          {state === 'completed' && paper && (
            <div className="bg-[#1A1A1A] text-white rounded-2xl px-6 py-4 mb-5 flex items-center justify-between max-w-3xl mx-auto">
              <p className="text-sm leading-relaxed flex-1 pr-4">
                <span className="font-semibold">Certainly!</span> Here is your customized Question Paper on{' '}
                <span className="text-orange-400">{subject}</span>.
              </p>
              <DownloadPDF />
            </div>
          )}

          {/* States */}
          {(state === 'loading' || state === 'processing') && (
            <div className="flex flex-col items-center justify-center py-32 max-w-3xl mx-auto">
              <div className="relative w-20 h-20 mb-6">
                <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-t-orange-500 border-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <path d="M14 3C14 3 8 9.5 8 15.5C8 18.985 10.686 22 14 22C17.314 22 20 18.985 20 15.5C20 9.5 14 3 14 3Z" fill="url(#grad)" />
                    <defs>
                      <linearGradient id="grad" x1="14" y1="3" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F97316" />
                        <stop offset="1" stopColor="#DC2626" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Generating Question Paper</h2>
              <p className="text-sm text-gray-500 text-center max-w-xs">{progressMsg}</p>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {state === 'failed' && (
            <div className="flex flex-col items-center justify-center py-32 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-2.694-.834-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Generation Failed</h2>
              <p className="text-sm text-gray-500 mb-6">Something went wrong while generating the question paper.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/assignments/create')}
                  className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full text-sm font-medium hover:bg-gray-800"
                >
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/assignments')}
                  className="px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back to Assignments
                </button>
              </div>
            </div>
          )}

          {state === 'completed' && paper && (
            <div className="max-w-3xl mx-auto">
              <QuestionPaper paper={paper} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
