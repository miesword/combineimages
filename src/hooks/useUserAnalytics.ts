import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

export function useUserAnalytics() {
  const startTime = useRef<number>(Date.now());
  const isActive = useRef<boolean>(true);

  useEffect(() => {
    // 追踪页面访问
    track('page_view', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
    });

    // 追踪用户活跃状态
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive.current = false;
        track('page_blur', {
          session_duration: Date.now() - startTime.current,
        });
      } else {
        isActive.current = true;
        track('page_focus');
      }
    };

    // 追踪页面停留时间
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - startTime.current;
      track('session_end', {
        session_duration: sessionDuration,
        timestamp: new Date().toISOString(),
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 追踪用户交互事件
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    track(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      session_duration: Date.now() - startTime.current,
    });
  };

  return { trackEvent };
}