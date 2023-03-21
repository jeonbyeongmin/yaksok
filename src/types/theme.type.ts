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

// Colors
export type GrayscaleColors = keyof typeof grayscaleColors;
export type BrandColors = keyof typeof brandColors;
export type SpecialColors = keyof typeof specialColors;
export type DarkSpecialColors = keyof typeof darkSpecialColors;
export type Gradients = keyof typeof gradients;
export type DarkGradients = keyof typeof darkGradients;

// Typography
export type FontSizes = keyof typeof fontSizes;
export type LineHeights = keyof typeof lineHeights;
export type FontWeights = keyof typeof fontWeights;

// Sizes
export type NumericSizes = keyof typeof numericSizes;
export type SemanticSizes = keyof typeof semanticSizes;

// Space
export type NumericSpace = keyof typeof numericSpace;
export type SemanticSpace = keyof typeof semanticSpace;

// Misc
export type Radii = keyof typeof radii;
export type ZIndices = keyof typeof zIndices;
export type Shadows = keyof typeof shadows;
export type Transitions = keyof typeof transitions;
