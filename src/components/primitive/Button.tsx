import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import { ComponentProps, ReactNode, forwardRef, useMemo } from 'react';

import { Loader } from '@/components/primitive/Loader';

export type ButtonVariants = ComponentProps<typeof CustomButton>;
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonColorScheme = 'gray' | 'primary';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';

interface ButtonProps extends ButtonVariants {
  // controls
  isLoading?: boolean;
  shadow?: boolean;
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  radius?: ButtonRadius;

  // elements
  leftElement?: ReactNode;
  rightElement?: ReactNode;

  // alternative
  css?: CSS;
}

export const ButtonCompound = [
  // Solid
  {
    variant: 'solid',
    colorScheme: 'gray',
    css: {
      bgColor: '$gray100',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$gray200',
        },
      },
      '&:active': { bgColor: '$gray300' },
      '&:hover:active': { bgColor: '$gray300' },

      [`.${darkTheme} &`]: {
        bgColor: '$gray600',
        color: '$white',
        '@hover': {
          '&:hover:not(:disabled)': {
            bgColor: '$gray700',
          },
        },
        '&:active': { bgColor: '$gray800' },
        '&:hover:active': { bgColor: '$gray800' },
      },
    },
  },
  {
    variant: 'solid',
    colorScheme: 'primary',
    css: {
      bgColor: '$primary100',
      color: '$white',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$primary200',
        },
      },
      '&:active': { bgColor: '$primary300' },
      '&:hover:active': { bgColor: '$primary300' },
      '&:disabled': { bgColor: '$gray200' },

      [`.${darkTheme} &`]: {
        bgColor: '$darken100',
        '@hover': {
          '&:hover:not(:disabled)': {
            bgColor: '$darken200',
          },
        },
        '&:active': { bgColor: '$darken300' },
        '&:hover:active': { bgColor: '$darken300' },
        '&:disabled': { bgColor: '$gray700' },
      },
    },
  },

  // Outline
  {
    variant: 'outline',
    colorScheme: 'gray',
    css: {
      border: '1px solid $gray200',
      color: '$gray300',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$gray100',
        },
      },
      '&:active': { bgColor: '$gray200' },
      '&:hover:active': { bgColor: '$gray200' },

      [`.${darkTheme} &`]: {
        border: '1px solid $gray700',
        color: '$gray600',
      },
    },
  },
  {
    variant: 'outline',
    colorScheme: 'primary',
    css: {
      border: '1px solid $primary200',
      color: '$primary200',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$lighten400',
        },
      },
      '&:active': { bgColor: '$lighten300' },
      '&:hover:active': { bgColor: '$lighten300' },

      [`.${darkTheme} &`]: {
        border: '1px solid $darken200',
        color: '$darken100',
      },
    },
  },

  // Ghost
  {
    variant: 'ghost',
    colorScheme: 'gray',
    css: {
      color: '$gray300',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$gray100',
        },
      },
      '&:active': { bgColor: '$gray200' },
      '&:hover:active': { bgColor: '$gray200' },

      [`.${darkTheme} &`]: {
        color: '$gray100',
        '@hover': {
          '&:hover:not(:disabled)': {
            bgColor: '$gray600',
          },
        },
        '&:active': { bgColor: '$gray700' },
        '&:hover:active': { bgColor: '$gray700' },
      },
    },
  },
  {
    variant: 'ghost',
    colorScheme: 'primary',
    css: {
      color: '$primary200',
      '@hover': {
        '&:hover:not(:disabled)': {
          bgColor: '$lighten300',
        },
      },
      '&:active': { bgColor: '$lighten200' },
      '&:hover:active': { bgColor: '$lighten200' },

      [`.${darkTheme} &`]: {
        color: '$lighten300',
        '@hover': {
          '&:hover:not(:disabled)': {
            bgColor: '$darken100',
          },
        },
        '&:active': { bgColor: '$darken200' },
        '&:hover:active': { bgColor: '$darken200' },
      },
    },
  },
];

const CustomButton = styled('button', {
  // Reset
  all: 'unset',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  fontVariantNumeric: 'tabular-nums',

  // Custom
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$4',

  boxSizing: 'border-box',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },
  '&:disabled': { cursor: 'not-allowed' },

  transition: '$fast',

  // Variants
  variants: {
    size: {
      xs: {
        px: '$8',
        gap: '$3',
        '@bp0': {
          height: '$14',
          minW: '$30',
        },
        '@bp1': {
          height: '$16',
        },
      },
      sm: {
        px: '$10',
        gap: '$3',

        '@bp0': {
          height: '$18',
          minW: '$40',
        },
        '@bp1': {
          height: '$20',
        },
      },
      md: {
        px: '$12',
        gap: '$2',
        '@bp0': {
          height: '$20',
          minW: '$60',
        },
        '@bp1': {
          height: '$22',
        },
      },
      lg: {
        px: '$12',
        gap: '$2',
        '@bp0': {
          height: '$22',
          minW: '$70',
        },
        '@bp1': {
          height: '$24',
        },
      },
      xl: {
        px: '$14',
        '@bp0': {
          height: '$24',
          minW: '$80',
        },
        '@bp1': {
          height: '$26',
        },
      },
      '2xl': {
        px: '$14',
        '@bp0': {
          height: '$28',
          minW: '$100',
        },
        '@bp1': {
          height: '$32',
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

    loading: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
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
      link: {
        '@hover': {
          '&:hover:not(:disabled)': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },

  compoundVariants: [
    ...ButtonCompound,

    // Link
    {
      variant: 'link',
      colorScheme: 'gray',
      css: {
        color: '$gray300',
        '&:active': { color: '$gray500' },
        '&:hover:active': { color: '$gray500' },
        [`.${darkTheme} &`]: {
          color: '$gray100',
          '&:active': { color: '$gray300' },
          '&:hover:active': { color: '$gray300' },
        },
      },
    },
    {
      variant: 'link',
      colorScheme: 'primary',
      css: {
        color: '$primary300',
        '&:active': { color: '$darken200' },
        '&:hover:active': { color: '$darken200' },
        [`.${darkTheme} &`]: {
          color: '$lighten300',
          '&:active': { color: '$primary200' },
          '&:hover:active': { color: '$primary200' },
        },
      },
    },
  ],

  defaultVariants: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'primary',
    radius: 'md',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    leftElement,
    isLoading,
    colorScheme,
    variant,
    size,
    rightElement,
    onClick,
    ...rest
  } = props;

  const loaderColor = useMemo(() => {
    if (!variant || variant === 'solid') return 'white';
    switch (colorScheme) {
      case 'primary':
        return 'primary';
      case 'gray':
        return 'gray';
    }
  }, [colorScheme, variant]);

  return (
    <CustomButton
      ref={ref}
      size={size}
      colorScheme={colorScheme}
      variant={variant}
      onClick={!isLoading ? onClick : undefined}
      loading={isLoading}
      {...rest}>
      {isLoading ? (
        <Loader size={size} color={loaderColor} />
      ) : (
        <>
          {leftElement}
          {children}
          {rightElement}
        </>
      )}
    </CustomButton>
  );
});

Button.displayName = 'Button';
