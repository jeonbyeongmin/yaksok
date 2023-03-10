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
  ({ children, title = 'YAKSOK - 모두 가능한 시간을 한번에' }, forwardedRef) => {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="약속 잡기 캘린더 - YAKSOK" />
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta property="og:image" content="/og.png" />
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
