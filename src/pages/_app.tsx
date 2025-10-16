import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'development') {
    process.env.NEXT_PUBLIC_SHOW_TOOLS = 'true';
  }

  return <Component {...pageProps} />;
}
