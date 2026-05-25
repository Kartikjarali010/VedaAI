'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EmptyState from '@/components/assignments/EmptyState';
import AssignmentCard from '@/components/assignments/AssignmentCard';
import { getAssignments } from '@/lib/api';
import { Assignment } from '@/types';
import Link from 'next/link';
import { useAssignmentStore } from '@/store/useAssignmentStore';

export default function AssignmentsPage() {
  const { assignments, setAssignments, removeAssignment } = useAssignmentStore();
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAssignments()
      .then((data) => { setAssignments(data); setBackendError(false); })
      .catch(() => setBackendError(true))
      .finally(() => setLoading(false));
  }, [setAssignments]);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="Assignment" />
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
            </div>
          ) : backendError ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Backend not running</h2>
              <p className="text-sm text-gray-500 text-center max-w-sm mb-1">
                Make sure the backend server is running on port 5001.
              </p>
              <code className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 mt-2">
                cd backend &amp;&amp; npm run dev
              </code>
            </div>
          ) : assignments.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Page header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    <h1 className="text-xl font-semibold text-gray-900">Assignments</h1>
                  </div>
                  <p className="text-sm text-gray-500 ml-4">Manage and create assignments for your classes.</p>
                </div>
                <Link
                  href="/assignments/create"
                  className="flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full py-2.5 px-5 hover:bg-gray-800 active:bg-gray-900 transition-colors shadow-sm"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  New Assignment
                </Link>
              </div>

              {/* Filter / Search bar */}
              <div className="flex items-center gap-3 mb-5">
                <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors font-medium">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
                  </svg>
                  Filter By
                </button>
                <div className="relative w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search assignments…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                {search && (
                  <span className="text-xs text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((a) => (
                  <AssignmentCard key={a._id} assignment={a} onDeleted={removeAssignment} />
                ))}
              </div>

              {filtered.length === 0 && search && (
                <div className="text-center py-16 text-gray-400 text-sm">No assignments match &ldquo;{search}&rdquo;</div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
}
