import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';

type ButtonVariants = ComponentProps<typeof CustomButton>;
interface IButton extends ButtonVariants {
  css?: CSS;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const CustomButton = styled('button', {
  all: 'unset',
  alignItems: 'center',
  userSelect: 'none',
  boxSizing: 'border-box',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  gap: '$2',

  height: '$5',
  px: '$2',
  fontSize: '$md',
  fontWeight: '$regular',
  fontVariantNumeric: 'tabular-nums',

  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '@hover': {
    '&:hover:not(:disabled)': {
      opacity: 0.8,
    },
  },

  transition: '$fast',

  variants: {
    size: {
      xs: {
        height: '$16',
        px: '$6',
      },
      sm: {
        height: '$20',
        px: '$8',
      },
      md: {
        height: '$22',
        px: '$10',
      },
      lg: {
        height: '$23',
        px: '$12',
      },
      xl: {
        height: '$24',
        px: '$13',
      },
      '2xl': {
        height: '$25',
        px: '$14',
      },
    },

    fontSize: {
      xs: { fs: '$xs' },
      sm: { fs: '$sm' },
      md: { fs: '$md' },
      lg: { fs: '$lg' },
      xl: { fs: '$xl' },
      '2xl': { fs: '$2xl' },
    },

    radius: {
      xs: { borderRadius: '$xs' },
      sm: { borderRadius: '$sm' },
      md: { borderRadius: '$md' },
      lg: { borderRadius: '$lg' },
      xl: { borderRadius: '$xl' },
      '2xl': { borderRadius: '$2xl' },
      '3xl': { borderRadius: '$3xl' },
      round: { borderRadius: '$round' },
      pill: { borderRadius: '$pill' },
    },

    color: {
      // grayscale
      gray: {
        bgColor: '$gray100',
        [`.${darkTheme} &`]: {
          backgroundColor: '$gray700',
        },
      },
      light: {
        bgColor: '$panel',
        border: '1px solid $gray200',
        [`.${darkTheme} &`]: {
          border: '1px solid $gray700',
        },
      },
      black: { bgColor: '#000000' },

      // brand
      primary: {
        bgColor: '$primary',
        '&:disabled': { backgroundColor: '$gray200' },

        [`.${darkTheme} &`]: {
          bgColor: '$darken100',
          '&:disabled': { backgroundColor: '$gray700' },
        },
      },
      lighten100: { bgColor: '#86CCF3' },
      lighten200: { bgColor: '#B5DFF7' },
      lighten300: { bgColor: '#E3F3FC' },
      lighten400: { bgColor: '#F2F9FE' },

      darken100: { bgColor: '#106A9D' },
      darken200: { bgColor: '#0B4B6F' },
      darken300: { bgColor: '#072C40' },
      darken400: { bgColor: '#020C12' },
    },

    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: '$slate11',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: 'transparent',
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8',
        },
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    fontSize: 'md',
    radius: 'md',
  },
});

export const Button = forwardRef<ElementRef<typeof CustomButton>, IButton>(
  ({ children, leftElement, rightElement, ...props }, forwaredRef) => {
    return (
      <CustomButton ref={forwaredRef} {...props}>
        {!!leftElement ? leftElement : null}
        {children}
        {!!rightElement ? rightElement : null}
      </CustomButton>
    );
  }
);

Button.displayName = 'Button';
