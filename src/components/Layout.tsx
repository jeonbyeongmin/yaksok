import { Box } from '@/components/primitive/Box';
import Head from 'next/head';
import Header from 'src/components/Header';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

function Layout({ children, title = 'YAKSOK' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="from" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Header />
        {children}
      </Box>
    </>
  );
}

export default Layout;
