import { Box } from '@/components/primitive/Box';
import { Flex } from '@/components/primitive/Flex';
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
      <Container>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Container>
    </>
  );
}

const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  w: '$full',
  h: '$full',
  // minH: '$screenH',
  position: 'relative',
});

const Content = styled('main', {
  w: '$full',
  flexGrow: 1,
});

export default Layout;
