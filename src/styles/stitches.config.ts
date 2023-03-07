import type * as Stitches from '@stitches/react';

import { createStitches } from '@stitches/react';

export type { VariantProps } from '@stitches/react';

export const { css, config, createTheme, getCssText, globalCss, reset, styled, theme, keyframes } =
  createStitches({
    prefix: 'yaksok',

    /**
     * Theme Tokens
     */
    theme: {
      /**
       * 10px = 1rem
       */

      /**
       * Colors
       */

      colors: {
        // grayscale
        white: '#FFFFFF',
        gray100: '#F5F5F5',
        gray200: '#DBDBDB',
        gray300: '#A8A8A8',
        gray400: '#8F8F8F',
        gray500: '#757575',
        gray600: '#5C5C5C',
        gray700: '#424242',
        gray800: '#292929',
        black: '#000000',

        // brand
        primary: '#58B8EE',

        lighten100: '#86CCF3',
        lighten200: '#B5DFF7',
        lighten300: '#E3F3FC',
        lighten400: '#F2F9FE',

        darken100: '#106A9D',
        darken200: '#0B4B6F',
        darken300: '#072C40',
        darken400: '#020C12',

        red: '#EB4D3D',

        // light
        panel: '#FFFFFF',
        glass: 'rgba(255, 255, 255, 0.5)',
        box: 'rgba(255, 255, 255, 0.5)',
        line: '#DBDBDB',

        linearBg100:
          'linear-gradient(93.62deg, rgba(88, 184, 238, 0.48) 4.12%, rgba(236, 211, 255, 0.8) 58.48%, rgba(227, 243, 252, 0.8) 100.53%)',
        linearBg200:
          'linear-gradient(316.01deg, rgba(88, 184, 238, 0.5) -16.21%, rgba(236, 227, 255, 0.5) 56.62%, rgba(227, 243, 252, 0) 117.77%, rgba(227, 243, 252, 0.5) 117.77%)',
        linearOvall100:
          'linear-gradient(129.33deg, rgba(84, 183, 238, 0.6) 14.58%, rgba(211, 118, 255, 0.2) 59.4%, rgba(255, 255, 255, 0.65) 103.67%)',
        linearOvall200: 'linear-gradient(124.76deg, #8FBCFF 18.26%, #E6F3FF 100.02%)',
        linearOvall300: 'linear-gradient(124.76deg, rgba(224, 209, 255, 0) -4.74%, #8FD7FF 85.94%)',
        linearOvall400: 'linear-gradient(126.84deg, #71C3FF 0%, #88CDFF 0.01%, #FFFFFF 119.13%)',
        linearOvall500: 'linear-gradient(141.47deg, rgba(240, 250, 255, 0) -8.27%, #27AAF4 106.7%)',
        linearOvall600:
          'linear-gradient(48.62deg, #71C3FF 0%, rgba(191, 140, 255, 0.5) 53.59%, rgba(240, 250, 255, 0) 107.18%)',
      },

      /**
       * Spacing
       * 1unit = 0.2rem = 2px
       */

      space: {
        0: '0rem',
        1: '0.2rem',
        2: '0.4rem',
        3: '0.6rem',
        4: '0.8rem',
        5: '1rem',
        6: '1.2rem',
        7: '1.4rem',
        8: '1.6rem',
        9: '1.8rem',
        10: '2rem',
        11: '2.2rem',
        12: '2.4rem',
        13: '2.6rem',
        14: '2.8rem',
        15: '3rem',
        16: '3.2rem',
        17: '3.4rem',
        18: '3.6rem',
        19: '3.8rem',
        20: '4rem',
        21: '4.2rem',
        22: '4.4rem',
        23: '4.6rem',
        24: '4.8rem',
        25: '5rem',
        26: '5.2rem',
        27: '5.4rem',
        28: '5.6rem',
        29: '5.8rem',
        30: '6rem',
        31: '6.2rem',
        32: '6.4rem',
        33: '6.6rem',
        34: '6.8rem',
        35: '7rem',
        36: '7.2rem',
        37: '7.4rem',
        38: '7.6rem',
        39: '7.8rem',
        40: '8rem',
        41: '8.2rem',
        42: '8.4rem',
        43: '8.6rem',
        44: '8.8rem',
        45: '9rem',
        46: '9.2rem',
        47: '9.4rem',
        48: '9.6rem',
        49: '9.8rem',
        50: '10rem',
        60: '12rem',
        70: '14rem',
        80: '16rem',
        90: '18rem',
        100: '20rem',

        // Semantic spacing
        xs: '0.2rem',
        sm: '0.4rem',
        md: '0.8rem',
        lg: '1.6rem',
        xl: '3.2rem',
        '2xl': '6.4rem',
        '3xl': '12.8rem',
      },

      /**
       * Sizes
       * 1unit = 0.2rem = 2px
       */

      sizes: {
        0: '0rem',
        1: '0.2rem',
        2: '0.4rem',
        3: '0.6rem',
        4: '0.8rem',
        5: '1rem',
        6: '1.2rem',
        7: '1.4rem',
        8: '1.6rem',
        9: '1.8rem',
        10: '2rem',
        11: '2.2rem',
        12: '2.4rem',
        13: '2.6rem',
        14: '2.8rem',
        15: '3rem',
        16: '3.2rem',
        17: '3.4rem',
        18: '3.6rem',
        19: '3.8rem',
        20: '4rem',
        21: '4.2rem',
        22: '4.4rem',
        23: '4.6rem',
        24: '4.8rem',
        25: '5rem',
        26: '5.2rem',
        27: '5.4rem',
        28: '5.6rem',
        29: '5.8rem',
        30: '6rem',
        31: '6.2rem',
        32: '6.4rem',
        33: '6.6rem',
        34: '6.8rem',
        35: '7rem',
        36: '7.2rem',
        37: '7.4rem',
        38: '7.6rem',
        39: '7.8rem',
        40: '8rem',
        41: '8.2rem',
        42: '8.4rem',
        43: '8.6rem',
        44: '8.8rem',
        45: '9rem',
        46: '9.2rem',
        47: '9.4rem',
        48: '9.6rem',
        49: '9.8rem',
        50: '10rem',
        51: '10.2rem',
        52: '10.4rem',
        53: '10.6rem',
        54: '10.8rem',
        55: '11rem',
        56: '11.2rem',
        57: '11.4rem',
        58: '11.6rem',
        59: '11.8rem',
        60: '12rem',
        70: '14rem',
        80: '16rem',
        90: '18rem',
        100: '20rem',
        110: '22rem',
        120: '24rem',
        130: '26rem',
        140: '28rem',
        150: '30rem',
        160: '32rem',
        170: '34rem',
        180: '36rem',
        190: '38rem',
        200: '40rem',
        250: '50rem',
        300: '60rem',
        350: '70rem',
        400: '80rem',
        450: '90rem',
        500: '100rem',

        // Semantic sizes
        inner: '100rem',
        container: '192rem',

        full: '100%',
        max: 'max-content',
        min: 'min-content',
        fit: 'fit-content',
        screenW: '100vw',
        screenH: '100vh',
      },

      /**
       * Typography
       */

      fontSizes: {
        xs: '1.2rem',
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
        xl: '2rem',
        '2xl': '2.2rem',
        '3xl': '2.4rem',
      },

      lineHeights: {
        xs: '1.2',
        sm: '1.3',
        md: '1.4',
        lg: '1.5',
        xl: '1.6',
        '2xl': '1.7',
        '3xl': '1.8',
      },

      fontWeights: {
        light: 300,
        regular: 400,
        bold: 700,
      },

      /**
       * Misc
       */

      radii: {
        xs: '0.4rem',
        sm: '0.5rem',
        md: '0.6rem',
        lg: '0.8rem',
        xl: '1.0rem',
        '2xl': '1.2rem',
        '3xl': '1.4rem',
        none: '0',
        round: '50%',
        pill: '9999px',
      },

      zIndices: {
        hide: -1,
        auto: 'auto',
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
      },

      shadows: {
        1: '0 0 1.5rem rgba(0, 0, 0, 0.1)',
        2: '0 0.4rem 3.2rem 0 rgba(0, 0, 0, 0.1)',
      },

      transitions: {
        fast: 'all 0.1s ease-in-out',
        normal: 'all 0.2s ease-in-out',
        slow: 'all 0.3s ease-in-out',
      },
    },

    media: {
      bp1: '(min-width: 480px)',
      bp2: '(min-width: 768px)',
      bp3: '(min-width: 1024px)',
      bp4: '(min-width: 1280px)',

      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },

    utils: {
      /**
       * Size utils
       */
      w: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
      }),
      minW: (value: Stitches.PropertyValue<'minWidth'>) => ({
        minWidth: value,
      }),
      maxW: (value: Stitches.PropertyValue<'maxWidth'>) => ({
        maxWidth: value,
      }),

      h: (value: Stitches.PropertyValue<'height'>) => ({
        height: value,
      }),
      minH: (value: Stitches.PropertyValue<'minHeight'>) => ({
        minHeight: value,
      }),
      maxH: (value: Stitches.PropertyValue<'maxHeight'>) => ({
        maxHeight: value,
      }),

      fs: (value: Stitches.ScaleValue<'fontSizes'>) => ({
        fontSize: value,
        lineHeight: value,
      }),

      /**
       * Spacing utils
       */
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.ScaleValue<'sizes'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.ScaleValue<'sizes'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.ScaleValue<'sizes'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.ScaleValue<'sizes'>) => ({
        marginTop: value,
        marginBottom: value,
      }),

      /**
       * Misc utils
       */
      br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
        borderRadius: value,
      }),
      btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
        borderTopRightRadius: value,
      }),
      bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
        borderBottomRightRadius: value,
      }),
      bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
        borderBottomLeftRadius: value,
      }),
      btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
        borderTopLeftRadius: value,
      }),

      bg: (value: Stitches.PropertyValue<'background'>) => ({
        background: value,
      }),

      bgColor: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
        backgroundColor: value,
      }),

      userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
        WebkitUserSelect: value,
        userSelect: value,
      }),

      appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
        WebkitAppearance: value,
        appearance: value,
      }),

      backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value,
      }),
    },
  });

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme('dark-theme', {
  colors: {
    panel: '#1E1F21',
    glass: 'rgba(30, 31, 33, 0.5)',
    box: 'rgba(41, 42, 45, 0.5)',
    line: 'rgba(143, 143, 143, 0.5)',

    // gradients
    linearBg100: 'linear-gradient(94.15deg, #10415C 24.92%, #592B7D 75.72%, #1E6D9A 115.61%)',
    linearBg200:
      'linear-gradient(318.31deg, rgba(16, 65, 92, 0.8) -15.86%, rgba(89, 43, 125, 0.72) 50.25%, rgba(30, 109, 154, 0.8) 105.76%)',
    linearOvall100:
      'linear-gradient(129.33deg, rgba(134, 204, 243, 0.6) 8.64%, rgba(208, 134, 243, 0.2) 57.38%, rgba(255, 255, 255, 0.3) 103.67%)',
    linearOvall200: 'linear-gradient(124.76deg, #34639A -4.74%, rgba(159, 110, 198, 0) 100.02%)',
    linearOvall300: 'linear-gradient(124.76deg, rgba(53, 44, 148, 0.5) -4.74%, #1B5B7E 85.94%)',
    linearOvall400:
      'linear-gradient(126.84deg, rgba(113, 195, 255, 0.3) 0%, rgba(16, 98, 157, 0.5) 119.13%)',
    linearOvall500:
      'linear-gradient(141.47deg, rgba(19, 28, 33, 0.6) -8.27%, rgba(0, 163, 255, 0.4) 106.7%)',
    linearOvall600:
      'linear-gradient(48.76deg, #2770A5 -25.25%, rgba(109, 56, 175, 0.2) 52.01%, rgba(237, 249, 255, 0.5) 107.19%)',
  },
});
