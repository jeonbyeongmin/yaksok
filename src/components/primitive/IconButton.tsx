import { ComponentProps, MouseEvent, ReactNode } from 'react';
import { darkTheme, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';

type IconButtonProps = ComponentProps<typeof ButtonWrapper> & {
  icon: ReactNode;
};

const ButtonWrapper = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'center',
  p: '$4',
  color: '$gray200',
  cursor: 'pointer',

  [`.${darkTheme} &`]: {
    color: '$gray600',
  },

  '&:hover': {
    color: '$gray400',
  },

  '&:active': {
    color: '$gray500',
  },

  variants: {
    color: {
      white: { color: '$white' },
      primary: { color: '$primary' },
      gray100: { color: '$gray100' },
      gray200: { color: '$gray200' },
      gray300: { color: '$gray300' },
      gray400: { color: '$gray400' },
      gray500: { color: '$gray500' },
      gray600: { color: '$gray600' },
      gray700: { color: '$gray700' },
      gray800: { color: '$gray800' },
      black: { color: '$black' },
    },

    visible: {
      true: {
        visibility: 'visible',
      },
      false: {
        '@bp1': {
          visibility: 'hidden',
        },
      },
    },
  },
});

function IconButton({ icon, onClick, ...props }: IconButtonProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    e.stopPropagation();
    onClick(e);
  };
  return (
    <ButtonWrapper onClick={handleClick} {...props}>
      {icon}
    </ButtonWrapper>
  );
}

export default IconButton;
