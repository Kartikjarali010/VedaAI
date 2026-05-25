'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Link from 'next/link';

const stats = [
  {
    label: 'Total Assignments', value: '0',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    label: 'Students Reached', value: '0',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  },
  {
    label: 'Papers Generated', value: '0',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  },
  {
    label: 'Groups Created', value: '0',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

const quickActions = [
  { label: 'Create Assignment', href: '/assignments/create', desc: 'Generate an AI question paper', dark: true },
  { label: 'My Assignments', href: '/assignments', desc: 'View and manage all papers', dark: false },
  { label: 'AI Toolkit', href: '/toolkit', desc: 'Explore AI teaching tools', dark: false },
  { label: 'My Library', href: '/library', desc: 'Access saved resources', dark: false },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="Home" />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <h1 className="text-lg font-semibold text-gray-900">Welcome back, John</h1>
            </div>
            <p className="text-sm text-gray-500 ml-4">Here&apos;s an overview of your activity.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">{s.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href}
                className={`rounded-2xl p-5 flex flex-col gap-2 hover:opacity-90 transition-all border ${a.dark ? 'bg-[#1A1A1A] text-white border-transparent' : 'bg-white text-gray-800 border-gray-200 hover:shadow-sm'}`}>
                <span className="font-semibold text-sm">{a.label}</span>
                <span className={`text-xs ${a.dark ? 'text-gray-400' : 'text-gray-400'}`}>{a.desc}</span>
              </Link>
            ))}
          </div>

          {/* Recent */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No recent activity yet.</p>
              <p className="text-xs text-gray-400 mt-1">Create your first assignment to get started.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
