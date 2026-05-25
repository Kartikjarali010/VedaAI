'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'My Groups', href: '/groups', icon: GroupsIcon },
  { label: 'Assignments', href: '/assignments', icon: AssignmentsIcon },
  { label: "AI Teacher's Toolkit", href: '/toolkit', icon: ToolkitIcon },
  { label: 'My Library', href: '/library', icon: LibraryIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/assignments') return pathname.startsWith('/assignments');
    return pathname === href;
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-gray-100 flex flex-col z-30 select-none">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <Link href="/assignments" className="flex items-center gap-2.5 group">
          <VedaAILogo />
          <span className="font-bold text-[17px] text-gray-900 group-hover:text-gray-700 transition-colors">VedaAI</span>
        </Link>
      </div>

      {/* Create Assignment Button */}
      <div className="px-4 mb-5 mt-3">
        <Link
          href="/assignments/create"
          className="flex items-center justify-center gap-2 w-full bg-[#1E1E1E] text-white text-[13.5px] font-medium rounded-full py-2.5 px-3 ring-2 ring-orange-400/70 hover:ring-orange-400 hover:bg-[#2a2a2a] active:bg-[#111] transition-all shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8L12 2z"/>
          </svg>
          <span>Create Assignment</span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                active
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100'
              }`}
            >
              <item.icon active={active} />
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 pt-3 pb-4 px-3 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <SettingsIcon />
          <span>Settings</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
            <Image src="/profile.png" alt="Profile" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-gray-900 truncate leading-tight">Delhi Public School</div>
            <div className="text-[11px] text-gray-400 truncate leading-tight mt-0.5">Bokaro Steel City</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function VedaAILogo() {
  return (
    <Image src="/logo.png" alt="VedaAI" width={32} height={32} className="flex-shrink-0 rounded-lg" />
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={active ? '#111827' : '#9ca3af'} strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function GroupsIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={active ? '#111827' : '#9ca3af'} strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function AssignmentsIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={active ? '#111827' : '#9ca3af'} strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ToolkitIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={active ? '#111827' : '#9ca3af'} strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function LibraryIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={active ? '#111827' : '#9ca3af'} strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
