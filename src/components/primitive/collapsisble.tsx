import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { keyframes, styled } from '@/styles/stitches.config';

const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: 'var(--radix-collapsible-content-height)',
  },
});

const slideUp = keyframes({
  from: {
    height: 'var(--radix-collapsible-content-height)',
  },
  to: {
    height: 0,
  },
});

const CollapsibleRoot = styled(CollapsiblePrimitive.Root, {
  w: '$full',
});

const CollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
  w: '$full',
  bgColor: 'transparent',
  border: 'none',

  svg: {
    transition: 'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)',
  },

  '&[data-state="open"]': {
    svg: {
      transform: 'rotate(180deg)',
    },
  },
});

const CollapsibleContent = styled(CollapsiblePrimitive.Content, {
  w: '$full',
  overflow: 'hidden',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationDuration: '300ms',

  '&[data-state="open"]': {
    animationName: slideDown,
  },
  '&[data-state="closed"]': {
    animationName: slideUp,
  },
});

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
