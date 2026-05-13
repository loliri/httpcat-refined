'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'English', href: '/' },
  { code: 'zh', label: '中文',    href: '/zh' },
];

type Props = {
  currentLocale: string;
};

const LanguageSwitcher = ({ currentLocale }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

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
      {/* Trigger button — frosted glass */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          color: 'inherit',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        }}
      >
        <span>{current.label}</span>
        {/* Arrow */}
        <span style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRight: '1.8px solid currentColor',
          borderBottom: '1.8px solid currentColor',
          transform: open ? 'rotate(-135deg) translateY(2px)' : 'rotate(45deg) translateY(-2px)',
          transition: 'transform 0.25s ease',
          opacity: 0.7,
        }} />
      </button>

      {/* Dropdown panel */}
      <ul
        role="listbox"
        style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 10px)',
          width: '140px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '14px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          zIndex: 50,
          listStyle: 'none',
          padding: 0,
          margin: 0,
          // animate
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease, visibility 0.25s',
        }}
      >
        {LANGUAGES.map((lang, idx) => {
          const isActive = lang.code === currentLocale;
          return (
            <li
              key={lang.code}
              role="option"
              aria-selected={isActive}
              style={{
                borderBottom: idx < LANGUAGES.length - 1
                  ? '1px solid rgba(255,255,255,0.08)'
                  : 'none',
              }}
            >
              <button
                onClick={() => { setOpen(false); router.push(lang.href); }}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? '#d0383e' : 'inherit',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: isActive ? 1 : 0.65,
                  transition: 'opacity 0.15s, padding-left 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                    (e.currentTarget as HTMLButtonElement).style.paddingLeft = '20px';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.65';
                    (e.currentTarget as HTMLButtonElement).style.paddingLeft = '16px';
                  }
                }}
              >
                <span>{lang.label}</span>
                {isActive && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#d0383e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6l3.5 3.5L11 2"/>
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
