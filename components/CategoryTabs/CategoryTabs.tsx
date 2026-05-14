'use client';

import { useState, useEffect } from 'react';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import Thumbnail from '@/components/Thumbnail';
import type { Category } from '@/lib/categories';

type Props = {
  categories: Category[];
  t: { [key: string]: string };
};

// 把 CAT_4XX → 4xx，CAT_CF → cf 这种短哈希值，放在 URL 里更友好
const slugFromKey = (key: string) => key.replace(/^CAT_/, '').toLowerCase();

const CategoryTabs = ({ categories, t }: Props) => {
  const [active, setActive] = useState(0);

  // Mount 时读 hash 恢复 tab；hashchange 时跟随
  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.replace(/^#/, '');
      if (!slug) return;
      const idx = categories.findIndex((c) => slugFromKey(c.key) === slug);
      if (idx !== -1) setActive(idx);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [categories]);

  const handleClick = (idx: number) => {
    setActive(idx);
    const slug = slugFromKey(categories[idx].key);
    // replaceState 避免每次切 tab 都加一条历史
    history.replaceState(null, '', `#${slug}`);
  };

  const current = categories[active];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mt-8 mb-0">
        {categories.map((cat, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={cat.key}
              onClick={() => handleClick(idx)}
              className={[
                'px-4 py-2 rounded-t text-sm font-semibold transition-colors border-b-2',
                isActive
                  ? 'border-[--interactive] text-[--interactive] bg-[--bg-color]'
                  : 'border-transparent opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              {t[cat.key]}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-b-2 border-[--interactive] mb-6" />

      {/* Description */}
      <p className="text-sm opacity-70 mb-6">{t[current.descKey]}</p>

      {/* Grid */}
      <ThumbnailGrid>
        {current.statuses.map((status) => (
          <Thumbnail
            code={status.code}
            key={status.code}
            description={status.message}
            t={t}
          />
        ))}
      </ThumbnailGrid>
    </div>
  );
};

export default CategoryTabs;
