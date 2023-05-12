import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { Flex } from '@/components/primitive/flex';
import { styled } from '@/styles/stitches.config';

const SwitchRoot = styled(Flex, {
  width: '$30',
  height: '$15',
  borderRadius: '$pill',
  cursor: 'pointer',
  alignItems: 'center',
  boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
  p: '0.3rem',
  userSelect: 'none',

  variants: {
    checked: {
      true: {
        justifyContent: 'flex-end',
        background: '#1E1F21',
      },
      false: {
        justifyContent: 'flex-start',
        background: '$gray100',
      },
    },
  },

  defaultVariants: {
    checked: false,
  },
});

const SwitchThumb = styled(motion.div, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$12',
  height: '$12',
  borderRadius: '50%',

  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
  color: '$gray500',

  variants: {
    checked: {
      true: {
        background: '$gray200',
      },
      false: {
        background: '$white',
      },
    },
  },
});

interface SwitchProps {
  icon?: ReactNode;
  checked?: boolean;
  onSwitch?: () => void;
}

export function Switch({ icon, checked, onSwitch }: SwitchProps) {
  return (
    <SwitchRoot onClick={onSwitch} checked={checked}>
      <SwitchThumb
        checked={checked}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        layout
      >
        {icon}
      </SwitchThumb>
    </SwitchRoot>
  );
}
