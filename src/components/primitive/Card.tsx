import { darkTheme, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';

export const Card = styled(Flex, {
  w: '$full',
  boxShadow: '$1',
  borderRadius: '$lg',
  bg: '$glass',
});

export const CardInner = styled(Flex, {
  position: 'relative',
  flexDirection: 'column',
  w: '$full',
  p: '$10',
  pt: '$10',
  color: '$gray800',

  '@bp1': { p: '$15' },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});
