import { Box } from '@/components/primitive/Box';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from 'src/components/Header';
import { ReactNode } from 'react';
import { styled } from '@/styles/stitches.config';

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
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

const Content = styled(Box, {
  w: '$full',
  h: '$full',
});

export default Layout;
