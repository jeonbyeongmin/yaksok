import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';

import { CheckIcon } from '@radix-ui/react-icons';
import { styled } from '@/styles/stitches.config';

type ItemProps = ComponentProps<typeof CustomItem>;

interface ISelectItem extends ItemProps {
  children: ReactNode;
}

const CustomItem = styled(Item, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '$gray800',
  borderRadius: '$md',
  p: '$4 $7',
  userSelect: 'none',
  outline: 'none',

  '@hover': {
    '&:hover': {
      bgColor: '$lighten400',
    },
  },

  '&[data-disabled]': {
    color: '$gray200',
    pointerEvents: 'none',
  },
});

export const SelectItem = forwardRef<
  ElementRef<typeof CustomItem>,
  ISelectItem
>(({ children, ...props }, forwardedRef) => {
  return (
    <CustomItem {...props} ref={forwardedRef}>
      <ItemText>{children}</ItemText>
      <ItemIndicator>
        <CheckIcon />
      </ItemIndicator>
    </CustomItem>
  );
});

SelectItem.displayName = 'SelectItem';
