import { Flex } from '@/components/primitive/Flex';
import { styled } from '@/styles/stitches.config';

export const Badge = styled(Flex, {
  w: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  px: '$6',
  py: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  userSelect: 'none',

  variants: {
    active: {
      true: { bg: '$darken200' },
      false: { bg: '$lighten300' },
    },
  },
});
