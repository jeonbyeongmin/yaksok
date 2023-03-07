import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { ComponentProps, ElementRef, forwardRef } from 'react';

import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from '@/components/primitive/Overlay';
import { panelStyles } from '@/components/primitive/Panel';

const fadeIn = `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`;

const moveDown = `@keyframes moveDown {
  from {
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}`;

const CustomOverlay = styled(Overlay, overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const CustomContent = styled(Content, panelStyles, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  maxHeight: '85vh',

  marginTop: '-5vh',
  animation: `${fadeIn} 125ms linear, ${moveDown} 125ms cubic-bezier(0.22, 1, 0.36, 1)`,

  p: '$5',
  borderRadius: '$lg',

  willChange: 'transform',

  '&:focus': {
    outline: 'none',
  },

  bgColor: '$white',
  color: '$gray800',

  [`.${darkTheme} &`]: {
    bgColor: '$gray800',
    color: '$white',
  },
});

const CustomCloseButton = styled(Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

type DialogContentPrimitiveProps = ComponentProps<typeof CustomContent>;
type DialogContentProps = DialogContentPrimitiveProps & {
  css?: CSS;
  closeButton?: boolean;
};

const DialogContent = forwardRef<ElementRef<typeof CustomContent>, DialogContentProps>(
  ({ children, closeButton, ...props }, forwardedRef) => (
    <Portal>
      <CustomOverlay />
      <CustomContent {...props} ref={forwardedRef}>
        {children}
        {closeButton && (
          <CustomCloseButton aria-label="Close">
            <Cross1Icon />
          </CustomCloseButton>
        )}
      </CustomContent>
    </Portal>
  )
);

DialogContent.displayName = 'DialogContent';

const Dialog = Root;
const DialogTrigger = Trigger;
const DialogClose = Close;
const DialogTitle = Title;
const DialogDescription = Description;

export { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription };
