import Script from 'next/script';

export function GoatCounter() {
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
