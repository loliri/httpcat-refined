'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', href: '/' },
  { code: 'zh', label: '中文',    flag: '🇨🇳', href: '/zh' },
];

type Props = {
  currentLocale: string;
};

const LanguageSwitcher = ({ currentLocale }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current opacity-70 hover:opacity-100 transition-opacity text-sm font-medium"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 w-36 rounded-lg border border-[--interactive] bg-[--bg-color] shadow-lg overflow-hidden z-50"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLocale;
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push(lang.href);
                  }}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                    isActive
                      ? 'text-[--interactive] font-semibold'
                      : 'opacity-70 hover:opacity-100',
                  ].join(' ')}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {isActive && (
                    <svg className="ml-auto w-3.5 h-3.5 text-[--interactive]" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M1 6l3.5 3.5L11 2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
