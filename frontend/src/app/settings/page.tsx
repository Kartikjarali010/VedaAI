'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f4]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header title="Settings" />
        <main className="flex-1 p-8 max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            </div>
            <p className="text-sm text-gray-500 ml-4">Manage your account and preferences.</p>
          </div>

          <div className="space-y-4">
            {/* Profile */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Profile</h2>
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200">
                    <Image src="/profile.png" alt="Profile" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-400">john.doe@vedaai.com</p>
                  <p className="text-xs text-gray-400 mt-0.5">Delhi Public School, Bokaro Steel City</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: 'John Doe' },
                  { label: 'Email', value: 'john.doe@vedaai.com' },
                  { label: 'School / Institution', value: 'Delhi Public School' },
                  { label: 'Role', value: 'Teacher' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
                    <input defaultValue={value} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-1">
                {[
                  { key: 'email', label: 'Email notifications', desc: 'Receive updates and reports via email' },
                  { key: 'push', label: 'Push notifications', desc: 'Browser push notifications for real-time alerts' },
                  { key: 'weekly', label: 'Weekly digest', desc: 'Summary of your activity every Monday' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                      style={{ width: 40, height: 22 }}
                      className={`relative rounded-full transition-colors flex-shrink-0 ${notifications[key as keyof typeof notifications] ? 'bg-gray-900' : 'bg-gray-200'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${notifications[key as keyof typeof notifications] ? 'translate-x-[18px]' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Security</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button onClick={() => router.push('/')}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-500 border border-red-100 rounded-full text-sm font-medium hover:bg-red-100 transition-colors">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
              <button onClick={handleSave}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${saved ? 'bg-green-600 text-white' : 'bg-[#1A1A1A] text-white hover:bg-gray-800'}`}>
                {saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
