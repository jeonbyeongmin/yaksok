import { Box } from '@/components/primitive/Box';
import { styled } from '@/styles/stitches.config';

export const BadgeWrapper = styled(Box, {
  w: '$40',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  textAlign: 'center',

  px: '$6',
  py: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  userSelect: 'none',
  fs: '$sm',
  fontWeight: '$bold',

  variants: {
    active: {
      true: { bg: '$darken200', color: '$white' },
      false: { bg: '$lighten300', color: '$darken200' },
    },
  },
});

interface BadgeProps {
  active?: boolean;
  content: string;
  onClick?: () => void;
}

export const Badge = ({ content, active = false, ...rest }: BadgeProps) => {
  return (
    <BadgeWrapper active={active} {...rest} title={content}>
      {content}
    </BadgeWrapper>
  );
};
