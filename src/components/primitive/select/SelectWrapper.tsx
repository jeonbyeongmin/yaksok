import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { ComponentProps, ElementRef, ReactNode, forwardRef, useEffect, useState } from 'react';
import {
  Content,
  Icon,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { VariantProps, darkTheme, styled } from '@/styles/stitches.config';

type RootProps = ComponentProps<typeof Root>;

type CustomTriggerVariants = VariantProps<typeof CustomTrigger>;
type CustomTriggerVariant = Pick<CustomTriggerVariants, 'variant'>;
type CustomTriggerRadius = Pick<CustomTriggerVariants, 'radius'>;
type CustomTriggerScale = Pick<CustomTriggerVariants, 'scale'>;

interface ISelect extends RootProps {
  variant?: CustomTriggerVariant['variant'];
  radius?: CustomTriggerRadius['radius'];
  scale?: CustomTriggerScale['scale'];
  children: ReactNode;
  placeholder?: string;
  width?: string;
}

const CustomContent = styled(Content, {
  overflow: 'hidden',
  bgColor: '$panel',
  color: '$gray800',
  borderRadius: '$md',
  boxShadow: '$2',
  fs: '$sm',
  p: '$3',
  zIndex: 101,
  userSelect: 'none',

  '@bp1': {
    fs: '$md',
  },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

const CustomTrigger = styled(Trigger, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: '$4',
  bgColor: 'transparent',
  border: '1px solid $line',
  outline: 'none',
  w: '$full',
  color: '$gray800',
  zIndex: 101,

  [`.${darkTheme} &`]: {
    color: '$white',
  },

  variants: {
    variant: {
      blurred: {
        bgColor: '$glass',
        boxShadow: '$1',
      },
    },
    radius: {
      sm: { borderRadius: '$sm' },
      md: { borderRadius: '$md' },
      lg: { borderRadius: '$lg' },
      pill: { borderRadius: '$pill' },
    },
    scale: {
      sm: {
        fs: '$sm',
        py: '$3',
        px: '$4',
        gap: '$2',
      },
      md: {
        fs: '$sm',
        py: '$4',
        px: '$6',
        gap: '$3',
        '@bp1': { fs: '$md' },
      },
      lg: {
        fs: '$md',
        py: '$8',
        px: '$10',
        gap: '$4',
        '@bp1': { fs: '$lg' },
      },
    },
  },

  defaultVariants: {
    radius: 'md',
    scale: 'md',
  },
});

const CustomScrollDownButton = styled(ScrollDownButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '$full',
  h: '$8',
  cursor: 'pointer',
  outline: 'none',
});

const CustomScrollUpButton = styled(ScrollUpButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '$full',
  h: '$8',
  cursor: 'pointer',
  outline: 'none',
});

const StyledOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  isolation: 'isolate',
});

/* Workaround for touch events propagating to underlying elements https://github.com/radix-ui/primitives/issues/1658 */
const Overlay = ({ open }: { open?: boolean }) => {
  const [visible, setVisible] = useState<boolean | undefined>(open);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
    setVisible(true);
    return () => {};
  }, [open]);

  return visible ? <StyledOverlay onClick={(e) => e.stopPropagation()} /> : null;
};

export const SelectWrapper = forwardRef<ElementRef<typeof CustomTrigger>, ISelect>(
  ({ children, variant, width, radius, scale, placeholder, ...props }, forwardedRef) => {
    const [open, setOpen] = useState(false);

    return (
      <Root {...props} onOpenChange={setOpen} open={open}>
        <CustomTrigger
          variant={variant}
          radius={radius}
          scale={scale}
          ref={forwardedRef}
          css={{ width }}>
          <Value placeholder={placeholder} />
          <Icon>
            <ChevronDownIcon />
          </Icon>
        </CustomTrigger>
        <Portal>
          <>
            <Overlay open={open} />
            <CustomContent>
              <CustomScrollUpButton>
                <ChevronUpIcon />
              </CustomScrollUpButton>
              <Viewport>{children}</Viewport>
              <CustomScrollDownButton>
                <ChevronDownIcon />
              </CustomScrollDownButton>
            </CustomContent>
          </>
        </Portal>
      </Root>
    );
  }
);

SelectWrapper.displayName = 'SelectWrapper';
