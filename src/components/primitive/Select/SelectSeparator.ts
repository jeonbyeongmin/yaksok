import { Separator } from '@radix-ui/react-select';
import { styled } from '@/styles/stitches.config';

export const SelectSeparator = styled(Separator, {
  height: '1px',
  backgroundColor: '$gray200',

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
