import { Flex } from '@/components/primitive/Flex';
import { styled } from '@/styles/stitches.config';

export const Paper = styled(Flex, {
  w: '$full',
  bg: '$glass',
  pt: '$40',
  pb: '$30',
  px: '$5',

  '@bp1': {
    pt: '$50',
    pb: '$40',
  },

  flexDirection: 'column',
  maxW: '$inner',
  alignItems: 'center',
  position: 'relative',

  variants: {
    transparent: {
      true: {
        bg: 'rgba(255, 255, 255, 0)',
      },
    },
  },
});
