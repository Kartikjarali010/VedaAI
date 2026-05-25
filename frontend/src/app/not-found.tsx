import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col">
        <Header title="Page Not Found" showBack />
        <main className="flex-1 flex flex-col items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            {/* 404 Illustration */}
            <div className="relative inline-flex items-center justify-center w-40 h-40 mb-8">
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="80" cy="80" r="70" fill="#F5F5F4" stroke="#E5E7EB" strokeWidth="2"/>
                {/* Document */}
                <rect x="45" y="35" width="55" height="70" rx="5" fill="#E5E7EB"/>
                <rect x="52" y="48" width="30" height="4" rx="2" fill="#D1D5DB"/>
                <rect x="52" y="58" width="40" height="4" rx="2" fill="#D1D5DB"/>
                <rect x="52" y="68" width="25" height="4" rx="2" fill="#D1D5DB"/>
                <rect x="52" y="78" width="35" height="4" rx="2" fill="#D1D5DB"/>
                {/* Search Circle */}
                <circle cx="100" cy="100" r="26" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
                <circle cx="100" cy="100" r="17" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5"/>
                {/* X mark */}
                <path d="M93 93L107 107M107 93L93 107" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
                {/* Magnifier handle */}
                <line x1="120" y1="119" x2="130" y2="129" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round"/>
                {/* Sparkles */}
                <circle cx="38" cy="118" r="4" fill="#BFDBFE"/>
                <circle cx="128" cy="44" r="5" fill="#FDE68A"/>
                <circle cx="142" cy="90" r="3" fill="#BBF7D0"/>
              </svg>
            </div>

            {/* Text */}
            <h1 className="text-6xl font-bold text-gray-900 mb-2 tracking-tight">404</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Page not found</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/assignments"
                className="flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full py-2.5 px-6 hover:bg-gray-800 transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Assignments
              </Link>
              <Link
                href="/assignments/create"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-full py-2.5 px-5 hover:bg-gray-50 transition-colors"
              >
                Create Assignment
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
