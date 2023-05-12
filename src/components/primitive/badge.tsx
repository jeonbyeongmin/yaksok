import { CSS, darkTheme, styled } from '@/styles/stitches.config';
import { ComponentProps, forwardRef } from 'react';

type BadgeVariants = ComponentProps<typeof CustomBadge>;
type BadgeSize = 'xs' | 'sm' | 'md';
type BadgeColorScheme = 'primary' | 'gray';
type BadgeRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';

interface BadgeProps extends BadgeVariants {
  // controls
  size?: BadgeSize;
  colorScheme?: BadgeColorScheme;
  radius?: BadgeRadius;

  content: string;
  active?: boolean;

  // alternative
  css?: CSS;
}

export const CustomBadge = styled('div', {
  // Reset
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  textAlign: 'center',
  textVerticalAlign: 'middle',
  fontWeight: 'bold',

  borderRadius: '$md',
  flexWrap: 'wrap',

  variants: {
    size: {
      xs: {
        w: '$25',
        px: '$4',
        py: '$2',
        fs: '$xs',
      },
      sm: {
        w: '$40',
        px: '$6',
        py: '$3',
        fs: '$sm',
      },
      md: {
        w: '$45',
        px: '$6',
        py: '$3',
        fs: '$md',
      },
    },

    colorScheme: {
      primary: {},
      gray: {},
    },

    radius: {
      xs: { borderRadius: '$xs' },
      sm: { borderRadius: '$sm' },
      md: { borderRadius: '$md' },
      lg: { borderRadius: '$lg' },
      xl: { borderRadius: '$xl' },
      '2xl': { borderRadius: '$2xl' },
      '3xl': { borderRadius: '$3xl' },
      pill: { borderRadius: '$pill' },
    },

    // Boolean
    clickable: {
      true: {
        cursor: 'pointer',
        userSelect: 'none',
      },
      false: {
        pointerEvents: 'none',
      },
    },
    active: {
      true: {
        bg: '$darken200',
        color: '$lighten200',

        '&:active': { bg: '$darken300' },
      },
      false: { bg: '$lighten300', color: '$primary300', '&:active': { bg: '$lighten200' } },
    },
  },

  compoundVariants: [
    {
      colorScheme: 'primary',
      active: false,
      css: {
        bg: '$lighten300',
        color: '$primary300',
        '&:active': { bg: '$lighten200' },

        [`.${darkTheme} &`]: {
          bg: '$lighten100',
          color: '$darken200',
          '&:active': { bg: '$primary100' },
        },
      },
    },
    {
      colorScheme: 'primary',
      active: true,
      css: {
        bg: '$primary300',
        color: '$lighten300',
        '&:active': { bg: '$darken100' },

        [`.${darkTheme} &`]: {
          bg: '$darken200',
          color: '$lighten100',
          '&:active': { bg: '$darken300' },
        },
      },
    },
    {
      colorScheme: 'gray',
      active: false,
      css: {
        bg: '$gray100',
        color: '$gray500',
        '&:active': { bg: '$gray200' },

        [`.${darkTheme} &`]: {
          bg: '$gray300',
          color: '$gray700',
          '&:active': { bg: '$gray400' },
        },
      },
    },
    {
      colorScheme: 'gray',
      active: true,
      css: {
        bg: '$gray500',
        color: '$gray100',
        '&:active': { bg: '$gray600' },

        [`.${darkTheme} &`]: {
          bg: '$gray700',
          color: '$gray300',
          '&:active': { bg: '$gray800' },
        },
      },
    },
  ],

  defaultVariants: {
    size: 'md',
    colorScheme: 'primary',
    active: false,
  },
});

export const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const { content, onClick, ...rest } = props;
  return (
    <CustomBadge ref={ref} title={content} clickable={!!onClick} onClick={onClick} {...rest}>
      {content}
    </CustomBadge>
  );
});

Badge.displayName = 'Badge';
