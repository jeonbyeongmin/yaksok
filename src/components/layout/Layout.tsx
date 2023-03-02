import { ElementRef, ReactNode, forwardRef } from 'react';

import { Box } from '@/components/primitive/Box';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import { styled } from '@/styles/stitches.config';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  w: '$full',
  h: '$full',
  position: 'relative',
  overflowX: 'hidden',
});

const Content = styled('main', {
  w: '$full',
  flexGrow: 1,
});

export const Layout = forwardRef<ElementRef<typeof Container>, LayoutProps>(
  ({ children, title = 'YAKSOK' }, forwardedRef) => {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="from" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container ref={forwardedRef}>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </Container>
      </>
    );
  }
);

Layout.displayName = 'Layout';
