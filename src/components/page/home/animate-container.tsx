import { Box } from '@/components/primitive/box';
import { Flex } from '@/components/primitive/flex';
import { styled } from '@/styles/stitches.config';

interface AnimateContainerProps {
  children: React.ReactNode;
}

export function AnimateContainer({ children }: AnimateContainerProps) {
  return (
    <Container justify='center' align='center'>
      <UnderLayer />
      <Wrapper>
        <Inner justify='center' align='center' direction='column'>
          {children}
        </Inner>
      </Wrapper>
    </Container>
  );
}

const Container = styled(Flex, {
  w: '$full',
  h: '$100',
});

const Wrapper = styled(Flex, {
  w: '$container',
  h: '$full',
  alignItems: 'center',
  justifyContent: 'center',
});

const UnderLayer = styled(Box, {
  w: '$full',
  h: '$200',
  bg: '$linearBg100',
  position: 'absolute',
  zIndex: -1,
});

const Inner = styled(Flex, {
  'w': '$full',
  'h': '$full',
  'pt': '$30',
  'px': '$10',
  'gap': '$20',
  '@bp1': { w: '$250' },
});
