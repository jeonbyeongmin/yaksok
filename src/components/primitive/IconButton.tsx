import { ButtonColorScheme, ButtonCompound, ButtonRadius } from '@/components/primitive/Button';
import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import { ComponentProps, MouseEvent, forwardRef } from 'react';
import { Icon, IconName } from '@/components/primitive/Icon';

type IconButtonVariants = ComponentProps<typeof CustomIconButton>;
type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'embossing';
type IconButtonColorScheme = ButtonColorScheme;
type IconButtonRadius = ButtonRadius;

interface IconButtonProps extends IconButtonVariants {
  // controls
  name: IconName;
  variant?: IconButtonVariant;
  colorScheme?: IconButtonColorScheme;
  radius?: IconButtonRadius;
  shadow?: boolean;
  visible?: boolean;
  size?: number;

  // alternative
  css?: CSS;
}

const CustomIconButton = styled('button', {
  // Reset
  all: 'unset',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',

  // Custom
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '$4',

  variants: {
    visible: {
      true: {
        visibility: 'visible',
      },
      false: {
        '@bp1': {
          visibility: 'hidden',
        },
      },
    },

    radius: {
      xs: { borderRadius: '$xs' },
      sm: { borderRadius: '$sm' },
      md: { borderRadius: '$md' },
      lg: { borderRadius: '$lg' },
      xl: { borderRadius: '$xl' },
      '2xl': { borderRadius: '$2xl' },
      '3xl': { borderRadius: '$3xl' },
      pill: { borderRadius: '$pill' },
    },

    shadow: {
      true: {
        boxShadow: '$1',
      },
    },

    colorScheme: {
      gray: {},
      primary: {},
    },

    variant: {
      solid: {},
      outline: {
        bgColor: '$panel',
        [`.${darkTheme} &`]: {
          '@hover': {
            '&:hover:not(:disabled)': {
              bgColor: '$darken400',
            },
          },
          '&:active': { bgColor: '$black' },
          '&:hover:active': { bgColor: '$black' },
        },
      },
      ghost: { bgColor: 'transparent' },
      embossing: {},
    },
  },

  compoundVariants: [
    ...ButtonCompound,

    // Embossing
    {
      variant: 'embossing',
      colorScheme: 'gray',
      css: {
        color: '$gray300',
        '@hover': {
          '&:hover:not(:disabled)': {
            color: '$gray500',
          },
        },
        '&:active': { color: '$gray600' },
        '&:hover:active': { color: '$gray600' },

        [`.${darkTheme} &`]: {
          color: '$gray100',
          '@hover': {
            '&:hover:not(:disabled)': {
              color: '$gray300',
            },
          },
          '&:active': { color: '$gray400' },
          '&:hover:active': { color: '$gray400' },
        },
      },
    },
    {
      variant: 'embossing',
      colorScheme: 'primary',
      css: {
        color: '$primary100',
        '@hover': {
          '&:hover:not(:disabled)': {
            color: '$primary200',
          },
        },
        '&:active': { color: '$primary300' },
        '&:hover:active': { color: '$primary300' },

        [`.${darkTheme} &`]: {
          color: '$lighten300',
          '@hover': {
            '&:hover:not(:disabled)': {
              color: '$primary200',
            },
          },
          '&:active': { color: '$primary300' },
          '&:hover:active': { color: '$primary300' },
        },
      },
    },
  ],

  defaultVariants: {
    colorScheme: 'gray',
    variant: 'outline',
    radius: 'md',
  },
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { name, size, onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    e.stopPropagation();
    onClick(e);
  };

  return (
    <CustomIconButton ref={ref} onClick={handleClick} {...rest}>
      <Icon name={name ?? 'calendar'} size={size} />
    </CustomIconButton>
  );
});

IconButton.displayName = 'IconButton';
