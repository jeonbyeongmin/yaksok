import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { VariantProps, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';

// type
type CustomInputProps = ComponentProps<typeof CustomInput>;

type InputWrapperVariants = VariantProps<typeof InputWrapper>;
type InputWrapperVariant = Pick<InputWrapperVariants, 'variant'>;
type InputWrapperRadius = Pick<InputWrapperVariants, 'radius'>;
type InputWrapperScale = Pick<InputWrapperVariants, 'scale'>;

interface IInput extends CustomInputProps {
  variant?: InputWrapperVariant['variant'];
  radius?: InputWrapperRadius['radius'];
  scale?: InputWrapperScale['scale'];
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

// style
const InputWrapper = styled(Flex, {
  bgColor: '$white',
  p: '$sm',
  ai: 'center',
  jc: 'space-between',

  variants: {
    variant: {
      outline: {
        border: '1px solid $gray200',
      },

      blurred: {
        bgColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid $white',
        boxShadow: '$1',
      },
    },
    radius: {
      sm: { borderRadius: '$sm' },
      md: { borderRadius: '$md' },
      lg: { borderRadius: '$lg' },
      pill: { borderRadius: '$pill' },
    },
    scale: {
      sm: {
        fs: '$sm',
        py: '$3',
        px: '$4',
        gap: '$2',
      },
      md: {
        fs: '$md',
        py: '$4',
        px: '$6',
        gap: '$3',
      },
      lg: {
        fs: '$lg',
        py: '$8',
        px: '$10',
        gap: '$4',
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    radius: 'sm',
    scale: 'md',
  },
});

const CustomInput = styled('input', {
  w: '$full',
  bgColor: '$transparent',
  outline: 'none',
  color: '$black',
  border: 0,

  variants: {
    scale: {
      sm: {
        fs: '$sm',
      },
      md: {
        fs: '$md',
      },
      lg: {
        fs: '$lg',
      },
    },
  },

  defaultVariants: {
    scale: 'md',
  },
});

// component
const Input = forwardRef<ElementRef<typeof CustomInput>, IInput>(
  (
    { variant, width, radius, scale, leftElement, rightElement, ...props },
    forwardedRef
  ) => {
    return (
      <InputWrapper
        variant={variant}
        scale={scale}
        radius={radius}
        css={{
          width,
        }}
      >
        {leftElement}
        <CustomInput ref={forwardedRef} scale={scale} {...props} />
        {rightElement}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export { Input };
