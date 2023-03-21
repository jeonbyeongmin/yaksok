import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { darkTheme, styled } from '@/styles/stitches.config';

import type { Radii } from '@/types/theme.type';

type InputVariants = ComponentProps<typeof CustomInput>;
type InputVariant = 'outline' | 'blurred';
type InputRadius = Radii;
type InputSize = 'sm' | 'md' | 'lg' | 'xl';

interface InputProps extends InputVariants {
  variant?: InputVariant;
  radius?: InputRadius;
  size?: InputSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const InputWrapper = styled('div', {
  display: 'flex',
  bgColor: '$transparent',
  alignItems: 'center',
  w: '$full',
  color: '$black',
  [`.${darkTheme} &`]: { color: '$white' },

  variants: {
    variant: {
      outline: {
        border: '1px solid $gray200',
        [`.${darkTheme} &`]: { border: '1px solid $gray700' },
      },

      blurred: {
        bgColor: '$glass',
        border: '1px solid $line',
        boxShadow: '$1',
      },
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

    size: {
      sm: {
        py: '$3',
        px: '$4',
        gap: '$2',
        maxW: '$80',
        '@bp1': { maxW: '$160' },
      },
      md: {
        py: '$4',
        px: '$6',
        gap: '$3',
        maxW: '$100',
        '@bp1': { maxW: '$180' },
      },
      lg: {
        py: '$5',
        px: '$8',
        gap: '$3',
        maxW: '$120',
        '@bp1': { maxW: '$200' },
      },
      xl: {
        py: '$6',
        px: '$10',
        gap: '$4',
        maxW: '$150',
        '@bp1': { maxW: '$250' },
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    radius: 'md',
    size: 'md',
  },
});

const CustomInput = styled('input', {
  w: '$full',
  bgColor: '$transparent',
  outline: 'none',
  color: '$black',
  border: 0,

  [`.${darkTheme} &`]: {
    color: '$white',
  },

  variants: {
    size: {
      sm: {
        fs: '$xs',
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
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export const Input = forwardRef<ElementRef<typeof CustomInput>, InputProps>((props, ref) => {
  const { variant, width, radius, size, leftElement, rightElement, ...rest } = props;
  return (
    <InputWrapper
      variant={variant}
      size={size}
      radius={radius}
      css={{
        width,
      }}>
      {leftElement}
      <CustomInput ref={ref} size={size} {...rest} />
      {rightElement}
    </InputWrapper>
  );
});

Input.displayName = 'Input';
