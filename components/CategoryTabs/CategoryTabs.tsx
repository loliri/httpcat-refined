'use client';

import { useState } from 'react';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import Thumbnail from '@/components/Thumbnail';
import type { Category } from '@/lib/categories';

type Props = {
  categories: Category[];
  t: { [key: string]: string };
};

const CategoryTabs = ({ categories, t }: Props) => {
  const [active, setActive] = useState(0);
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
              onClick={() => setActive(idx)}
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
