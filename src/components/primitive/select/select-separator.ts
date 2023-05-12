import { darkTheme, styled } from '@/styles/stitches.config';

import { Separator } from '@radix-ui/react-select';

export const SelectSeparator = styled(Separator, {
  height: '1px',
  backgroundColor: '$gray200',

  [`.${darkTheme} &`]: {
    backgroundColor: '$gray700',
  },

  variants: {
    color: {
      gray100: {
        backgroundColor: '$gray100',
      },

      gray200: {
        backgroundColor: '$gray200',
      },
    },
    size: {
      sm: {
        my: '$1',
      },
      lg: {
        height: '6px',
        my: '$4',
      },
    },
  },

  defaultVariants: {
    color: 'gray100',
    size: 'sm',
  },
});
