import { Flex } from '@/components/primitive/Flex';
import { motion } from 'framer-motion';
import { styled } from '@/styles/stitches.config';

interface AnimateContainerProps {
  children: React.ReactNode;
}

function AnimateContainer({ children }: AnimateContainerProps) {
  return (
    <Container align="center" justify="center">
      {children}
      <Ball3
        animate={{ x: [-700, -600, -700], y: [-150, 0, -150] }}
        transition={{ ease: 'linear', duration: 500, repeat: Infinity }}
      />
      <Ball2
        animate={{ x: [-500, -200, -500], y: [-100, 400, -100] }}
        transition={{ ease: 'linear', duration: 500, repeat: Infinity }}
      />
      <Ball
        animate={{ x: [-50, 100, -50], y: [-400, 100, -400] }}
        transition={{ ease: 'linear', duration: 600, repeat: Infinity }}
      />
      <Ball4
        animate={{ x: [-700, 100, -700], y: [150, -300, 150] }}
        transition={{ ease: 'linear', duration: 300, repeat: Infinity }}
      />
      <Ball5
        animate={{ x: [0, -800, 0], y: [0, 100, 0] }}
        transition={{ ease: 'linear', duration: 300, repeat: Infinity }}
      />
      <Ball6
        animate={{ x: [400, 800, 400], y: [-100, 200, -100] }}
        transition={{ ease: 'linear', duration: 300, repeat: Infinity }}
      />
    </Container>
  );
}

const Container = styled(Flex, {
  w: '$full',
  h: '$full',
  overflow: 'hidden',
});

const Ball = styled(motion.div, {
  width: '80rem',
  height: '80rem',
  borderRadius: '$round',
  bg: '$linearOvall300',
  position: 'absolute',
  zIndex: -1,
  filter: 'blur(25px)',
  transform: 'rotate(-4.19deg)',
});

const Ball2 = styled(motion.div, {
  width: '40rem',
  height: '40rem',
  borderRadius: '$round',
  bg: '$linearOvall200',
  position: 'absolute',
  zIndex: -1,
  filter: 'blur(25px)',
});
const Ball3 = styled(motion.div, {
  width: '40rem',
  height: '40rem',
  borderRadius: '$round',
  bg: '$linearOvall100',
  position: 'absolute',
  zIndex: -1,
  filter: 'blur(25px)',
});
const Ball4 = styled(motion.div, {
  width: '7rem',
  height: '7rem',
  borderRadius: '$round',
  bg: '$linearOvall400',
  position: 'absolute',
  zIndex: -1,
});

const Ball5 = styled(motion.div, {
  width: '4rem',
  height: '4rem',
  borderRadius: '$round',
  bg: '$linearOvall500',
  position: 'absolute',
  zIndex: -1,
});
const Ball6 = styled(motion.div, {
  width: '10rem',
  height: '10rem',
  borderRadius: '$round',
  bg: '$linearOvall600',
  position: 'absolute',
  zIndex: -1,
});

export default AnimateContainer;
