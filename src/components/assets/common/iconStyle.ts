import { darkTheme, styled } from '@/styles/stitches.config';

export const Path = styled('path', {
  fill: '$darken200',

  [`.${darkTheme} &`]: {
    fill: '$white',
  },

  variants: {
    color: {
      transparent: { fill: 'transparent' },

      white: { fill: '$white' },
      gray100: { fill: '$gray100' },
      gray200: { fill: '$gray200' },
      gray300: { fill: '$gray300' },
      gray400: { fill: '$gray400' },
      gray500: { fill: '$gray500' },
      gray600: { fill: '$gray600' },
      gray700: { fill: '$gray700' },
      gray800: { fill: '$gray800' },
      black: { fill: '$black' },

      primary: { fill: '$primary' },

      lighten100: { fill: '#D9F0FF' },
      lighten200: { fill: '#B5DFF7' },
      lighten300: { fill: '#E3F3FC' },

      darken100: { fill: '#106A9D' },
      darken200: { fill: '#0B4B6F' },
      darken300: { fill: '#072C40' },
      darken400: { fill: '#020C12' },
    },
  },
});

export const Svg = styled('svg', {});
