'use client';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24">
      <div className="w-32 h-32 mb-8 relative">
        <svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="15" width="70" height="88" rx="6" fill="#E5E7EB" />
          <rect x="35" y="30" width="50" height="5" rx="2.5" fill="#D1D5DB" />
          <rect x="35" y="42" width="40" height="5" rx="2.5" fill="#D1D5DB" />
          <rect x="35" y="54" width="45" height="5" rx="2.5" fill="#D1D5DB" />
          <circle cx="85" cy="82" r="28" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="85" cy="82" r="22" fill="white" />
          <path d="M76 82L82 88L95 75" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="73" y1="73" x2="97" y2="91" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <circle cx="107" cy="58" r="5" fill="#BFDBFE" />
          <circle cx="60" cy="100" r="4" fill="#FDE68A" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">No assignments yet</h2>
      <p className="text-sm text-gray-500 text-center max-w-xs mb-8">
        Create your first assignment to start collecting and grading student submissions. You can set
        up rubrics, define marking criteria, and let AI assist with grading.
      </p>
      <Link
        href="/assignments/create"
        className="flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full py-2.5 px-5 hover:bg-gray-800 transition-colors"
      >
        <span className="text-base leading-none">+</span>
        <span>Create Your First Assignment</span>
      </Link>
    </div>
  );
}
