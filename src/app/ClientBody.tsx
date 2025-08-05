'use client';

import { useUserAnalytics } from '../hooks/useUserAnalytics';
import { useEffect } from 'react';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const { trackEvent } = useUserAnalytics();

  useEffect(() => {
    // 追踪用户设备信息
    trackEvent('user_info', {
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
      browser: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
    });

    // 追踪滚动行为
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        trackEvent('scroll_depth', { percentage: scrollPercentage });
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackEvent]);

  return <>{children}</>;
}
