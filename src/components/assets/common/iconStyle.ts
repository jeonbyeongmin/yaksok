import { styled } from '@/styles/stitches.config';

export const Path = styled('path', {
  variants: {
    color: {
      transparent: { fill: 'transparent' },

      white: { fill: '#FFFFFF' },
      gray100: { fill: '#F5F5F5' },
      gray200: { fill: '#DBDBDB' },
      gray300: { fill: '#A8A8A8' },
      gray400: { fill: '#8F8F8F' },
      gray500: { fill: '#757575' },
      gray600: { fill: '#5C5C5C' },
      gray700: { fill: '#424242' },
      gray800: { fill: '#292929' },
      black: { fill: '#000000' },

      primary: { fill: '58B8EE' },

      lighten100: { fill: '#86CCF3' },
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
