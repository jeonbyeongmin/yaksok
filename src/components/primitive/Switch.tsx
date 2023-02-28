import { Flex } from '@/components/primitive/Flex';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@/styles/stitches.config';

const SwitchRoot = styled(Flex, {
  width: '$30',
  height: '$15',
  borderRadius: '$pill',
  cursor: 'pointer',
  alignItems: 'center',
  boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
  p: '0.3rem',

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
  background: 'white',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
  color: '$gray500',
});

interface SwitchProps {
  icon?: ReactNode;
  checked?: boolean;
  onSwitch?: () => void;
}

function Switch({ icon, checked, onSwitch }: SwitchProps) {
  return (
    <SwitchRoot onClick={onSwitch} checked={checked}>
      <SwitchThumb layout transition={{ type: 'spring', stiffness: 700, damping: 30 }}>
        {icon}
      </SwitchThumb>
    </SwitchRoot>
  );
}

export default Switch;
