import { CSS, styled } from '@/styles/stitches.config';
import { ComponentProps, ElementRef, forwardRef } from 'react';

type TextVariants = ComponentProps<typeof CustomText>;
type TextProps = TextVariants & {
  css?: CSS;
  content: string;
};

const CustomText = styled('span', {
  // Reset
  margin: 0,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',
  flexShrink: 0,

  variants: {
    size: {
      xs: { fs: '$xs' },
      sm: {
        fs: '$xs',
        '@bp1': { fs: '$sm' },
      },
      md: {
        fs: '$sm',
        '@bp1': { fs: '$md' },
      },
      lg: {
        fs: '$md',
        '@bp1': { fs: '$lg' },
      },
      xl: {
        fs: '$lg',
        '@bp1': { fs: '$xl' },
      },
      '2xl': {
        fs: '$xl',
        '@bp1': { fs: '$2xl' },
      },
      '3xl': {
        fs: '$2xl',
        '@bp1': { fs: '$3xl' },
      },
    },

    weight: {
      light: { fontWeight: '$light' },
      regular: { fontWeight: '$regular' },
      bold: { fontWeight: '$bold' },
    },

    color: {
      // grayscale
      white: { color: '#FFFFFF' },
      gray100: { color: '#F5F5F5' },
      gray200: { color: '#DBDBDB' },
      gray300: { color: '#A8A8A8' },
      gray400: { color: '#8F8F8F' },
      gray500: { color: '#757575' },
      gray600: { color: '#5C5C5C' },
      gray700: { color: '#424242' },
      gray800: { color: '#292929' },
      black: { color: '#000000' },

      // brand
      primary: { color: '#58B8EE' },
      lighten100: { color: '#86CCF3' },
      lighten200: { color: '#B5DFF7' },
      lighten300: { color: '#E3F3FC' },
      lighten400: { color: '#F2F9FE' },

      darken100: { color: '#106A9D' },
      darken200: { color: '#0B4B6F' },
      darken300: { color: '#072C40' },
      darken400: { color: '#020C12' },

      red: { color: '$red' },
    },

    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },

    maxLines: {
      1: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
      },
      2: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
      3: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      },
      4: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    weight: 'regular',
  },
});

export const Text = forwardRef<ElementRef<typeof CustomText>, TextProps>(
  ({ content, ...props }, forwardedRef) => {
    return (
      <CustomText ref={forwardedRef} {...props}>
        {content}
      </CustomText>
    );
  }
);

Text.displayName = 'Text';
