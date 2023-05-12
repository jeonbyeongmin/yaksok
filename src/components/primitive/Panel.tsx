import { Flex } from '@/components/primitive/flex';
import { darkTheme, styled } from '@/styles/stitches.config';

export const Panel = styled(Flex, {
  w: '$full',
  boxShadow: '$1',
  borderRadius: '$lg',
  bg: '$glass',
});

export const PanelInner = styled(Flex, {
  'position': 'relative',
  'flexDirection': 'column',
  'w': '$full',
  'p': '$10',
  'pt': '$10',
  'color': '$gray800',

  '@bp1': { p: '$15' },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});
