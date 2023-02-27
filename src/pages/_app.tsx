import 'react-calendar/dist/Calendar.css'; // css import
import '@/styles/globals.css';
import '@/styles/calendar.css';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Noto_Sans } from '@next/font/google';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';
import { darkTheme } from '@/styles/stitches.config';
import { useMemo } from 'react';

const notoSans = Noto_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSans.className}>
      <NextNProgress />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: (resource, init) => {
            console.log(`fetching ${resource}`);
            return fetch(resource, init).then((res) => res.json());
          },
        }}>
        {' '}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          value={{
            light: 'light',
            dark: darkTheme.className,
          }}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </div>
  );
}
