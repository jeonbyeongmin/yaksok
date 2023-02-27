import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
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
}

const CustomContent = styled(Content, {
  overflow: 'hidden',
  bgColor: '$white',
  color: '$gray800',
  borderRadius: '$md',
  boxShadow: '$2',
  fs: '$md',
  p: '$3',

  [`.${darkTheme} &`]: {
    bgColor: 'rgb(45, 52, 66)',
    color: '$white',
  },
});

const CustomTrigger = styled(Trigger, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: '$4',
  bgColor: '$white',
  border: '1px solid $gray200',
  outline: 'none',
  w: '$full',

  [`.${darkTheme} &`]: {
    bgColor: 'rgba(45, 52, 66, 0.5)',
    border: '1px solid rgba(143, 143, 143, 0.5)',
  },

  variants: {
    variant: {
      blurred: {
        bgColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid $white',
        boxShadow: '$1',

        [`.${darkTheme} &`]: {
          bgColor: 'rgba(27, 32, 43, 0.5)',
          border: '1px solid rgba(143, 143, 143, 0.5)',
        },
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
        fs: '$md',
        py: '$4',
        px: '$6',
        gap: '$3',
      },
      lg: {
        fs: '$lg',
        py: '$8',
        px: '$10',
        gap: '$4',
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

export const SelectWrapper = forwardRef<ElementRef<typeof CustomTrigger>, ISelect>(
  ({ children, variant, radius, scale, placeholder, ...props }, forwardedRef) => {
    return (
      <Root {...props}>
        <CustomTrigger variant={variant} radius={radius} scale={scale} ref={forwardedRef}>
          <Value placeholder={placeholder} />
          <Icon>
            <ChevronDownIcon />
          </Icon>
        </CustomTrigger>
        <Portal>
          <CustomContent>
            <CustomScrollUpButton>
              <ChevronUpIcon />
            </CustomScrollUpButton>
            <Viewport>{children}</Viewport>
            <CustomScrollDownButton>
              <ChevronDownIcon />
            </CustomScrollDownButton>
          </CustomContent>
        </Portal>
      </Root>
    );
  }
);

SelectWrapper.displayName = 'SelectWrapper';
