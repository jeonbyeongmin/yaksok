import { styled } from '@/styles/stitches.config';

export const Flex = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',

  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      rowReverse: { flexDirection: 'row-reverse' },
      columnReverse: { flexDirection: 'column-reverse' },
    },

    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },

    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },

    wrap: {
      noWrap: { flexWrap: 'nowrap' },
      wrap: { flexWrap: 'wrap' },
      wrapReverse: { flexWrap: 'wrap-reverse' },
    },

    gap: {
      1: { gap: '$1' },
      2: { gap: '$2' },
      3: { gap: '$3' },
      4: { gap: '$4' },
      5: { gap: '$5' },
      6: { gap: '$6' },
      7: { gap: '$7' },
      8: { gap: '$8' },
      9: { gap: '$9' },
      10: { gap: '$10' },
      20: { gap: '$20' },
      30: { gap: '$30' },
    },

    px: {
      1: { px: '$1' },
      2: { px: '$2' },
      3: { px: '$3' },
      4: { px: '$4' },
      5: { px: '$5' },
      6: { px: '$6' },
      7: { px: '$7' },
      8: { px: '$8' },
      9: { px: '$9' },
      10: { px: '$10' },
    },

    py: {
      1: { py: '$1' },
      2: { py: '$2' },
      3: { py: '$3' },
      4: { py: '$4' },
      5: { py: '$5' },
      6: { py: '$6' },
      7: { py: '$7' },
      8: { py: '$8' },
      9: { py: '$9' },
      10: { py: '$10' },
    },

    mx: {
      1: { mx: '$1' },
      2: { mx: '$2' },
      3: { mx: '$3' },
      4: { mx: '$4' },
      5: { mx: '$5' },
      6: { mx: '$6' },
      7: { mx: '$7' },
      8: { mx: '$8' },
      9: { mx: '$9' },
      10: { mx: '$10' },
    },

    my: {
      1: { my: '$1' },
      2: { my: '$2' },
      3: { my: '$3' },
      4: { my: '$4' },
      5: { my: '$5' },
      6: { my: '$6' },
      7: { my: '$7' },
      8: { my: '$8' },
      9: { my: '$9' },
      10: { my: '$10' },
    },
  },

  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },
});
