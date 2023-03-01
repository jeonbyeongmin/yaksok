import { Box } from '@/components/primitive/Box';
import { Flex } from '@/components/primitive/Flex';
import { styled } from '@/styles/stitches.config';

interface AnimateContainerProps {
  children: React.ReactNode;
}

function AnimateContainer({ children }: AnimateContainerProps) {
  return (
    <Container justify="center">
      <UnderLayer />
      <Wrapper>
        {/* <Ball variant={3} />
        <Ball variant={2} />
        <Ball variant={1} />
        <Ball variant={4} />
        <Ball variant={5} />
        <Ball variant={6} /> */}
        {children}
      </Wrapper>
    </Container>
  );
}

const Container = styled(Flex, {
  w: '$full',
  h: '$200',
});

const Wrapper = styled(Flex, {
  w: '$container',
  h: '$full',
});

const UnderLayer = styled(Box, {
  w: '$full',
  h: '$200',
  bg: '$linearBg100',
  position: 'absolute',
  zIndex: -1,
});

const Ball = styled(Box, {
  borderRadius: '$round',
  position: 'absolute',
  zIndex: -1,

  variants: {
    variant: {
      1: {
        width: '80rem',
        height: '80rem',
        bg: '$linearOvall300',
        transform: 'rotate(-4.19deg)',
        filter: 'blur(25px)',
        position: 'absolute',
        top: '-50rem',
        // left: '50rem',
      },
      2: {
        width: '40rem',
        height: '40rem',
        bg: '$linearOvall200',
        position: 'absolute',
        filter: 'blur(25px)',
      },
      3: {
        width: '40rem',
        height: '40rem',
        bg: '$linearOvall100',
        position: 'absolute',
        filter: 'blur(25px)',
      },
      4: {
        width: '7rem',
        height: '7rem',
        bg: '$linearOvall400',
        position: 'absolute',
      },
      5: {
        width: '4rem',
        height: '4rem',
        bg: '$linearOvall500',
        position: 'absolute',
      },
      6: {
        width: '10rem',
        bg: '$linearOvall600',
        position: 'absolute',
      },
    },
  },
});

export default AnimateContainer;
