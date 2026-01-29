import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; event?: boolean }) => void;
    };
  }
}

export function GoatCounter() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.goatcounter) {
        window.goatcounter.count({ path: url });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <Script
      data-goatcounter="https://inspiredit.goatcounter.com/count"
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
