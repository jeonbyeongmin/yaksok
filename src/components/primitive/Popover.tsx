import * as PopoverPrimitive from '@radix-ui/react-popover';

import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { darkTheme, keyframes, styled } from '@/styles/stitches.config';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-5px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(5px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const CustomContent = styled(PopoverPrimitive.Content, {
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '$1',
  padding: '$10',
  width: '$100',
  maxWidth: '100%',
  color: '$gray800',
  fontSize: '$sm',
  lineHeight: 1.5,
  willChange: 'transform, opacity',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

  [`.${darkTheme} &`]: {
    backgroundColor: '$gray800',
    color: '$white',
  },

  '&[data-side="top"][data-state="open"]': {
    animationName: slideUpAndFade,
  },
  '&[data-side="right"][data-state="open"]': {
    animationName: slideRightAndFade,
  },
  '&[data-side="bottom"][data-state="open"]': {
    animationName: slideDownAndFade,
  },
  '&[data-side="left"][data-state="open"]': {
    animationName: slideLeftAndFade,
  },
});

const CustomArrow = styled(PopoverPrimitive.Arrow, {
  fill: '$white',

  [`.${darkTheme} &`]: {
    fill: '$gray800',
  },
});

type PopoverContentProps = ComponentProps<typeof CustomContent> & {
  children: ReactNode;
};

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = styled(PopoverPrimitive.Trigger, {
  all: 'unset',
});

export const PopoverContent = forwardRef<ElementRef<typeof CustomContent>, PopoverContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <CustomContent sideOffset={5} {...props} ref={forwardedRef}>
        {children}
        <CustomArrow />
      </CustomContent>
    </PopoverPrimitive.Portal>
  )
);

PopoverContent.displayName = 'PopoverContent';
