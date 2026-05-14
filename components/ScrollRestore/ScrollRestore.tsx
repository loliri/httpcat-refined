'use client';

import { useEffect } from 'react';

const ScrollRestore = () => {
  useEffect(() => {
    // 先恢复 tab 哈希，再恢复滚动位置；这样 CategoryTabs 的 hashchange 监听器
    // 能切到正确分类，渲染好高度后 scrollTo 才落到正确位置
    const savedHash = sessionStorage.getItem('homeCategoryHash');
    if (savedHash) {
      history.replaceState(null, '', savedHash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      sessionStorage.removeItem('homeCategoryHash');
    }

    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem('homeScrollPosition');
    }
  }, []);

  return null;
};

export default ScrollRestore;
