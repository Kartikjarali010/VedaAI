'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Assignment } from '@/types';
import { deleteAssignment } from '@/lib/api';

interface Props {
  assignment: Assignment;
  onDeleted: (id: string) => void;
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');
  } catch {
    return dateStr;
  }
}

export default function AssignmentCard({ assignment, onDeleted }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAssignment(assignment._id);
      onDeleted(assignment._id);
    } catch {
      setDeleting(false);
    }
    setMenuOpen(false);
  };

  const statusColor = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    failed: 'bg-red-100 text-red-700',
  }[assignment.status];

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer relative"
      onClick={() => router.push(`/assignments/${assignment._id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug pr-2 line-clamp-2">
          {assignment.title}
        </h3>
        <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <svg width="16" height="16" fill="#6b7280" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              <button
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => { router.push(`/assignments/${assignment._id}`); setMenuOpen(false); }}
              >
                View Assignment
              </button>
              <button
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>

      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor} mb-3 inline-block`}>
        {assignment.status}
      </span>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
        <span>
          Assigned on:{' '}
          <span className="font-medium text-gray-700">{formatDate(assignment.createdAt)}</span>
        </span>
        {assignment.dueDate && (
          <span>
            Due:{' '}
            <span className="font-medium text-gray-700">{assignment.dueDate}</span>
          </span>
        )}
      </div>
    </div>
  );
}
