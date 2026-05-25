'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

const categories = ['All', 'Question Papers', 'Notes', 'Templates', 'Worksheets'];

const resources = [
  { title: 'Grade 10 Physics — Sample Paper', type: 'Question Papers', size: '245 KB', date: 'May 2026' },
  { title: 'Science MCQ Template', type: 'Templates', size: '38 KB', date: 'Apr 2026' },
  { title: 'Mathematics Worksheet — Algebra', type: 'Worksheets', size: '120 KB', date: 'Apr 2026' },
];

export default function LibraryPage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = resources.filter(
    (r) => (active === 'All' || r.type === active) && r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="My Library" />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <h1 className="text-lg font-semibold text-gray-900">My Library</h1>
              </div>
              <p className="text-sm text-gray-500 ml-4">All your saved resources and generated papers.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full py-2.5 px-5 hover:bg-gray-800 transition-colors">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload
            </button>
          </div>

          {/* Search + categories */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" placeholder="Search resources…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${active === c ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm text-gray-400">No resources found.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-gray-100">
                  <tr className="text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-6 py-3 font-semibold">Name</th>
                    <th className="text-left px-6 py-3 font-semibold">Type</th>
                    <th className="text-left px-6 py-3 font-semibold">Size</th>
                    <th className="text-left px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((r) => (
                    <tr key={r.title} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-800">{r.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.type}</span></td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{r.size}</td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{r.date}</td>
                      <td className="px-6 py-3.5 text-right">
                        <button className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
