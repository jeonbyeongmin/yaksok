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
      sm: { fs: '$sm' },
      md: { fs: '$md' },
      lg: { fs: '$lg' },
      xl: { fs: '$xl' },
      '2xl': { fs: '$2xl' },
      '3xl': { fs: '$3xl' },
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

  compoundVariants: [
    {
      color: 'red',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $red11, $crimson11)',
      },
    },
    {
      color: 'crimson',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $crimson11, $pink11)',
      },
    },
    {
      color: 'pink',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $pink11, $purple11)',
      },
    },
    {
      color: 'purple',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $purple11, $violet11)',
      },
    },
    {
      color: 'violet',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $violet11, $indigo11)',
      },
    },
    {
      color: 'indigo',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $indigo11, $blue11)',
      },
    },
    {
      color: 'blue',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $blue11, $cyan11)',
      },
    },
    {
      color: 'cyan',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $cyan11, $teal11)',
      },
    },
    {
      color: 'teal',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $teal11, $green11)',
      },
    },
    {
      color: 'green',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $green11, $lime11)',
      },
    },
    {
      color: 'lime',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $lime11, $yellow11)',
      },
    },
    {
      color: 'yellow',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $yellow11, $orange11)',
      },
    },
    {
      color: 'orange',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $orange11, $red11)',
      },
    },
    {
      color: 'gold',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $gold11, $gold9)',
      },
    },
    {
      color: 'bronze',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $bronze11, $bronze9)',
      },
    },
    {
      color: 'gray',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $gray11, $gray12)',
      },
    },
    {
      color: 'contrast',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $hiContrast, $gray12)',
      },
    },
  ],

  defaultVariants: {
    size: 'md',
    weight: 'regular',
    color: 'contrast',
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
