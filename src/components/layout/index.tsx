import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SEO } from '@/components/layout/seo';
import { Box } from '@/components/primitive/Box';
import { styled } from '@/styles/stitches.config';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export function Layout({
  children,
  title = 'YAKSOK - 모두 가능한 시간을 한번에',
}: Props) {
  return (
    <>
      <SEO title={title} />
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
  position: 'relative',
  overflowX: 'hidden',
});

const Content = styled('main', {
  w: '$full',
  flexGrow: 1,
});
