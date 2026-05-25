'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const placeholderGroups = [
  { name: 'Grade 10 - Science', members: 32, color: 'bg-blue-100 text-blue-700' },
  { name: 'Grade 9 - Mathematics', members: 28, color: 'bg-green-100 text-green-700' },
  { name: 'Grade 8 - English', members: 35, color: 'bg-purple-100 text-purple-700' },
];

export default function GroupsPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="My Groups" />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <h1 className="text-lg font-semibold text-gray-900">My Groups</h1>
              </div>
              <p className="text-sm text-gray-500 ml-4">Manage your student groups and classes.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full py-2.5 px-5 hover:bg-gray-800 transition-colors">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Group
            </button>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {placeholderGroups.map((g) => (
              <div key={g.name} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${g.color}`}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{g.name}</h3>
                <p className="text-xs text-gray-400">{g.members} students</p>
              </div>
            ))}

            {/* Add new */}
            <button className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-400 min-h-[120px]">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Create Group</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Group Activity</h2>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-gray-400">No recent activity. Start by adding students to a group.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
