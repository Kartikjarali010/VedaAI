'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const tools = [
  {
    title: 'Question Paper Generator',
    desc: 'Generate custom AI-powered question papers for any subject and grade.',
    badge: 'Active',
    badgeColor: 'bg-green-100 text-green-700',
    href: '/assignments/create',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    iconBg: 'bg-orange-50 text-orange-500',
  },
  {
    title: 'Lesson Plan Builder',
    desc: 'Create structured lesson plans aligned to your curriculum goals.',
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-500',
    href: '#',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBg: 'bg-blue-50 text-blue-500',
  },
  {
    title: 'Quiz Maker',
    desc: 'Build interactive quizzes with automatic answer key generation.',
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-500',
    href: '#',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    iconBg: 'bg-purple-50 text-purple-500',
  },
  {
    title: 'Rubric Generator',
    desc: 'Auto-generate grading rubrics for essays, projects, and assignments.',
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-500',
    href: '#',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    iconBg: 'bg-green-50 text-green-500',
  },
  {
    title: 'Feedback Assistant',
    desc: 'Generate personalised written feedback for student submissions.',
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-500',
    href: '#',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    iconBg: 'bg-yellow-50 text-yellow-600',
  },
  {
    title: 'Study Guide Creator',
    desc: 'Turn notes and chapters into concise, student-ready study guides.',
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-500',
    href: '#',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    iconBg: 'bg-red-50 text-red-500',
  },
];

export default function ToolkitPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="AI Teacher's Toolkit" />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <h1 className="text-lg font-semibold text-gray-900">AI Teacher&apos;s Toolkit</h1>
            </div>
            <p className="text-sm text-gray-500 ml-4">Powerful AI tools built for educators.</p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {tools.map((t) => (
              <a key={t.title} href={t.href}
                className={`bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 transition-all ${t.href !== '#' ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' : 'cursor-default'}`}>
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.iconBg}`}>
                    {t.icon}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${t.badgeColor}`}>{t.badge}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1.5">{t.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
                {t.href !== '#' && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-orange-500">
                    Open tool
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
