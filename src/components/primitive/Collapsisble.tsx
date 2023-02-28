import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { keyframes, styled } from '@/styles/stitches.config';

const slideDown = keyframes({
  '0%': { height: 0 },
  '100%': { height: 'var(--radix-collapsible-content-height)' },
});

const slideUp = keyframes({
  '0%': { height: 'var(--radix-collapsible-content-height)' },
  '100%': { height: 0 },
});

const CollapsibleRoot = styled(CollapsiblePrimitive.Root, {
  w: '$full',
});

const CollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
  w: '$full',
  bgColor: 'transparent',
  border: 'none',
});

const CollapsibleContent = styled(CollapsiblePrimitive.Content, {
  w: '$full',
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
