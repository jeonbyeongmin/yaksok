import { Transition, motion } from 'framer-motion';

import { ButtonColorScheme } from '@/components/primitive/Button';
import { styled } from '@/styles/stitches.config';

const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CircleContainer = styled(motion.div, {
  display: 'flex',
  justifyContent: 'space-around',

  variants: {
    size: {
      xs: {
        width: '2rem',
        height: '2rem',
      },
      sm: {
        width: '2rem',
        height: '2rem',
      },
      md: {
        width: '3rem',
        height: '3rem',
      },
      lg: {
        width: '3rem',
        height: '3rem',
      },
      xl: {
        width: '4rem',
        height: '4rem',
      },
      '2xl': {
        width: '5rem',
        height: '5rem',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const Circle = styled(motion.div, {
  display: 'block',
  width: '25%',
  height: '25%',
  borderRadius: '$round',

  variants: {
    color: {
      primary: {
        backgroundColor: '$primary100',
      },
      white: {
        backgroundColor: '$white',
      },
      gray: {
        backgroundColor: '$gray200',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

// Variants
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const loadingCircleVariants = {
  start: {
    y: '130%',
  },
  end: {
    y: '180%',
  },
};

// Transition
const loadingCircleTransition: Transition = {
  duration: 0.4,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatType: 'reverse',
};

type LoaderColor = ButtonColorScheme | 'white';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: LoaderColor;
}

export const Loader = ({ size, color }: LoaderProps) => {
  return (
    <Wrapper>
      <CircleContainer
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
        size={size}>
        <Circle
          color={color}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <Circle
          color={color}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <Circle
          color={color}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </CircleContainer>
    </Wrapper>
  );
};
