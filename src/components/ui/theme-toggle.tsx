'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 检查本地存储或系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    // 应用主题到html元素
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 在 toggleTheme 函数中添加类名过渡逻辑
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // 添加过渡类
    document.documentElement.classList.add('theme-transitioning');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // 过渡完成后移除过渡类
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 350); // 略大于过渡时间
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-10 h-10 p-0 rounded-full bg-card border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-accent"
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? (
        // 太阳图标 (亮色模式)
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // 月亮图标 (暗色模式)
        <svg
          className="w-5 h-5 text-slate-700 dark:text-slate-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </Button>
  );
};

export default ThemeToggle;