import { Flex } from '@/components/primitive/Flex';
import { styled } from '@/styles/stitches.config';

export const Paper = styled(Flex, {
  w: '100%',
  bg: 'rgba(255, 255, 255, 0.6)',
  py: '$50',
  flexDirection: 'column',
  maxW: '$container',
  alignItems: 'center',

  variants: {
    transparent: {
      true: {
        bg: 'rgba(255, 255, 255, 0)',
      },
    },
  },
});
