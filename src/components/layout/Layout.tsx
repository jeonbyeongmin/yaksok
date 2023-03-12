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
          <script defer src="https://cdn.swygbro.com/public/widget/swyg-widget.js"></script>

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="shortcut icon" href="/icon.png" />

          <meta name="description" content="약속 잡기 캘린더 - YAKSOK" />
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta name="keywords" content="약속잡기,약속,캘린더" />
          <meta name="og:site_name" content="YAKSOK" />
          <meta name="og:title" content={title} />
          <meta name="og:description" content="모두 가능한 약속 시간을 알아보세요" />
          <meta name="og:type" content="website" />
          <meta name="og:url" content="https://yaksok.swygbro.com" />
          <meta property="og:image" content="/og.png" />

          <title>{title}</title>
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
