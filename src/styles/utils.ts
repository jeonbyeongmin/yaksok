import { PropertyValue, ScaleValue } from '@stitches/react';

export const stitchesUtils = {
  /**
   * Size utils
   */
  w: (value: PropertyValue<'width'>) => ({
    width: value,
  }),
  minW: (value: PropertyValue<'minWidth'>) => ({
    minWidth: value,
  }),
  maxW: (value: PropertyValue<'maxWidth'>) => ({
    maxWidth: value,
  }),

  h: (value: PropertyValue<'height'>) => ({
    height: value,
  }),
  minH: (value: PropertyValue<'minHeight'>) => ({
    minHeight: value,
  }),
  maxH: (value: PropertyValue<'maxHeight'>) => ({
    maxHeight: value,
  }),

  fs: (value: ScaleValue<'fontSizes'>) => ({
    fontSize: value,
    lineHeight: value,
  }),

  /**
   * Spacing utils
   */
  p: (value: PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pt: (value: PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  pr: (value: PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pb: (value: PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  px: (value: ScaleValue<'sizes'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: ScaleValue<'sizes'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mr: (value: PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mb: (value: PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mx: (value: ScaleValue<'sizes'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: ScaleValue<'sizes'>) => ({
    marginTop: value,
    marginBottom: value,
  }),

  /**
   * Misc utils
   */
  br: (value: PropertyValue<'borderRadius'>) => ({
    borderRadius: value,
  }),
  btrr: (value: PropertyValue<'borderTopRightRadius'>) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: PropertyValue<'borderBottomRightRadius'>) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: PropertyValue<'borderBottomLeftRadius'>) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: PropertyValue<'borderTopLeftRadius'>) => ({
    borderTopLeftRadius: value,
  }),

  bg: (value: PropertyValue<'background'>) => ({
    background: value,
  }),

  bgColor: (value: PropertyValue<'backgroundColor'>) => ({
    backgroundColor: value,
  }),

  userSelect: (value: PropertyValue<'userSelect'>) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),

  appearance: (value: PropertyValue<'appearance'>) => ({
    WebkitAppearance: value,
    appearance: value,
  }),

  backgroundClip: (value: PropertyValue<'backgroundClip'>) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
};
