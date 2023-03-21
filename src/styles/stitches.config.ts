import type * as Stitches from '@stitches/react';

import {
  brandColors,
  darkGradients,
  darkSpecialColors,
  gradients,
  grayscaleColors,
  specialColors,
} from '@/styles/theme/colors';
import { fontSizes, fontWeights, lineHeights } from '@/styles/theme/typography';
import { numericSizes, semanticSizes } from '@/styles/theme/sizes';
import { numericSpace, semanticSpace } from '@/styles/theme/space';
import { radii, shadows, transitions, zIndices } from '@/styles/theme/misc';

import { createStitches } from '@stitches/react';
import { stitchesMedia } from '@/styles/media';
import { stitchesUtils } from '@/styles/utils';

export type { VariantProps } from '@stitches/react';

/**
 * 10px = 1rem
 */

export const { css, config, createTheme, getCssText, globalCss, reset, styled, theme, keyframes } =
  createStitches({
    prefix: 'yaksok',

    theme: {
      colors: {
        ...grayscaleColors,
        ...brandColors,
        ...specialColors,
        ...gradients,
      },
      space: {
        ...numericSpace,
        ...semanticSpace,
      },
      sizes: {
        ...numericSizes,
        ...semanticSizes,
      },
      fontSizes: {
        ...fontSizes,
      },
      lineHeights: {
        ...lineHeights,
      },
      fontWeights: {
        ...fontWeights,
      },
      radii: {
        ...radii,
      },
      zIndices: {
        ...zIndices,
      },
      shadows: {
        ...shadows,
      },
      transitions: {
        ...transitions,
      },
    },

    media: {
      ...stitchesMedia,
    },

    utils: {
      ...stitchesUtils,
    },
  });

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme('dark-theme', {
  colors: {
    ...darkSpecialColors,
    ...darkGradients,
  },
});
