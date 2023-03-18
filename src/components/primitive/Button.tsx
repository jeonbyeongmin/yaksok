import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import { ComponentProps, ReactNode, forwardRef } from 'react';

import { Loader } from '@/components/primitive/Loader';

type ButtonVariants = ComponentProps<typeof CustomButton>;
interface ButtonProps extends ButtonVariants {
  css?: CSS;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  isLoading?: boolean;
  variant?: 'gray' | 'primary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';
  shadow?: boolean;
}

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
  border: '1px solid transparent',

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

    variant: {
      gray: {
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
          '@hover': {
            '&:hover:not(:disabled)': {
              bgColor: '$gray700',
            },
          },
          '&:active': { bgColor: '$gray800' },
          '&:hover:active': { bgColor: '$gray800' },
        },
      },

      outline: {
        bgColor: '$panel',
        border: '1px solid $gray200',
        '@hover': {
          '&:hover:not(:disabled)': {
            bgColor: '$gray100',
          },
        },
        '&:active': { bgColor: '$gray200' },
        '&:hover:active': { bgColor: '$gray200' },

        [`.${darkTheme} &`]: {
          border: '1px solid $gray700',
          '@hover': {
            '&:hover:not(:disabled)': {
              bgColor: '$darken400',
            },
          },
          '&:active': { bgColor: '$black' },
          '&:hover:active': { bgColor: '$black' },
        },
      },

      primary: {
        bgColor: '$primary100',
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

      ghost: {
        bgColor: 'transparent',
        '&:active': { opacity: 0.8 },
      },
    },

    shadow: {
      true: {
        boxShadow: '$1',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'primary',
    radius: 'md',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, leftElement, isLoading, size, rightElement, onClick, ...rest } = props;

  return (
    <CustomButton ref={ref} size={size} onClick={!isLoading ? onClick : undefined} {...rest}>
      {isLoading ? (
        <Loader color="white" />
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
