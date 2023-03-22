import 'react-calendar/dist/Calendar.css'; // css import
import '@/styles/globals.css';
import '@/styles/calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toast.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Noto_Sans_KR } from '@next/font/google';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import { darkTheme } from '@/styles/stitches.config';
import { logOnBrowser } from 'common/utils/log';

const notoSans = Noto_Sans_KR({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSans.className}>
      <NextNProgress options={{ showSpinner: false }} />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: (resource, init) => {
            logOnBrowser(`fetching ${resource}`);
            return fetch(resource, init).then((res) => res.json());
          },
        }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme={false}
          value={{
            light: 'light',
            dark: darkTheme.className,
          }}>
          <ToastContainer
            position="top-right"
            newestOnTop
            closeOnClick
            rtl={false}
            closeButton={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Component {...pageProps} />
          <Analytics />
        </ThemeProvider>
      </SWRConfig>
    </div>
  );
}

export default appWithTranslation(App);
