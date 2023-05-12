import type { BrandColors, FontSizes, FontWeights, GrayscaleColors } from '@/types/theme.type';
import { CSS, styled } from '@/styles/stitches.config';
import { ComponentProps, ElementRef, forwardRef } from 'react';

type TextVariants = ComponentProps<typeof CustomText>;
type TextSize = FontSizes;
type TextWeight = FontWeights;
type TextColor = BrandColors | GrayscaleColors;

interface TextProps extends TextVariants {
  // controls
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  maxLines?: 1 | 2 | 3 | 4;
  // gradient?: boolean;

  content: string;

  // alternative
  css?: CSS;
}

const CustomText = styled('span', {
  // Reset
  all: 'unset',
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
      white: { color: '$white' },
      gray100: { color: '$gray100' },
      gray200: { color: '$gray200' },
      gray300: { color: '$gray300' },
      gray400: { color: '$gray400' },
      gray500: { color: '$gray500' },
      gray600: { color: '$gray600' },
      gray700: { color: '$gray700' },
      gray800: { color: '$gray800' },
      gray900: { color: '$gray900' },
      black: { color: '$black' },

      // brand
      primary100: { color: '$primary100' },
      primary200: { color: '$primary200' },
      primary300: { color: '$primary300' },
      lighten100: { color: '$lighten100' },
      lighten200: { color: '$lighten200' },
      lighten300: { color: '$lighten300' },
      lighten400: { color: '$lighten400' },
      darken100: { color: '$darken100' },
      darken200: { color: '$darken200' },
      darken300: { color: '$darken300' },
      darken400: { color: '$darken400' },

      red: { color: '$red' },
    },

    // gradient: {
    //   true: {
    //     WebkitBackgroundClip: 'text',
    //     WebkitTextFillColor: 'transparent',
    //   },
    // },

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
