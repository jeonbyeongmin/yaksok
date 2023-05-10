import 'react-calendar/dist/Calendar.css'; // css import
import '@/styles/globals.css';
import '@/styles/calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toast.css';

import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import { Layout } from '@/components/layout';
import { GlobalStateProvider } from '@/contexts/global-state-provider';
import { darkTheme } from '@/styles/stitches.config';
import { fetcher } from '@/utils/fetcher';
import { Noto_Sans_KR } from '@next/font/google';

import type { AppProps } from 'next/app';
const notoSans = Noto_Sans_KR({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <div className={notoSans.className}>
        <NextNProgress options={{ showSpinner: false }} />
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher,
          }}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableColorScheme={false}
            value={{
              light: 'light',
              dark: darkTheme.className,
            }}
          >
            <ToastContainer
              position='top-right'
              newestOnTop
              closeOnClick
              rtl={false}
              closeButton={false}
              pauseOnFocusLoss
              draggable
              theme='light'
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SWRConfig>
      </div>
    </GlobalStateProvider>
  );
}

export default appWithTranslation(App);
