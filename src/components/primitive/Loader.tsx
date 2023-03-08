import { darkTheme, keyframes, styled } from '@/styles/stitches.config';

const ldsEllipsis1 = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});

const ldsEllipsis2 = keyframes({
  '0%': { transform: 'translate(0, 0)' },
  '100%': { transform: 'translate(10px, 0)' },
});

const ldsEllipsis2Sub = keyframes({
  '0%': { transform: 'translate(0, 0)' },
  '100%': { transform: 'translate(24px, 0)' },
});

const ldsEllipsis3 = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
});

const LdsEllipsis = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      md: {
        width: '$15',
        height: '$15',
      },
      lg: {
        width: '$32',
        height: '$32',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const LdsEllipsisChild = styled('div', {
  position: 'absolute',
  borderRadius: '$round',
  background: '$primary',
  animationTimingFunction: 'cubic-bezier(1, 0, 0, 1)',

  '&:nth-child(1)': { animation: `${ldsEllipsis1} 0.6s infinite` },
  '&:nth-child(2)': { animation: `${ldsEllipsis2} 0.6s infinite` },
  '&:nth-child(3)': { animation: `${ldsEllipsis2} 0.6s infinite` },
  '&:nth-child(4)': { animation: `${ldsEllipsis3} 0.6s infinite` },

  [`.${darkTheme} &`]: {
    background: '$white',
  },

  variants: {
    color: {
      primary: {
        background: '$primary',
      },
      white: {
        background: '$white',
      },
    },

    size: {
      md: {
        top: '$6',
        width: '$3',
        height: '$3',
        '&:nth-child(1)': { left: '0' },
        '&:nth-child(2)': { left: '0' },
        '&:nth-child(3)': { left: '$5' },
        '&:nth-child(4)': { left: '$10' },
      },
      lg: {
        top: '$13',
        width: '$7',
        height: '$7',
        '&:nth-child(1)': { left: '0' },
        '&:nth-child(2)': {
          left: '0',
          animation: `${ldsEllipsis2Sub} 0.6s infinite`,
        },
        '&:nth-child(3)': {
          left: '$12',
          animation: `${ldsEllipsis2Sub} 0.6s infinite`,
        },
        '&:nth-child(4)': { left: '$24' },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

interface LoaderProps {
  color?: 'primary' | 'white';
  size?: 'md' | 'lg';
}

export const Loader = ({ color, size }: LoaderProps) => {
  return (
    <LdsEllipsis size={size}>
      <LdsEllipsisChild color={color} size={size} />
      <LdsEllipsisChild color={color} size={size} />
      <LdsEllipsisChild color={color} size={size} />
      <LdsEllipsisChild color={color} size={size} />
    </LdsEllipsis>
  );
};
