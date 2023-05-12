import { Box, Flex, Text } from '@/components/primitive';
import { darkTheme, styled } from '@/styles/stitches.config';

interface SelectorCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SelectorCard({ title, description, children }: SelectorCardProps) {
  return (
    <SelectorWrapper direction="column" gap={3}>
      <Divider />
      <Text content={title} size="lg" weight="bold" />
      {!!description && <Text content={description} size="xs" color="gray400" />}
      {children}
    </SelectorWrapper>
  );
}

const SelectorWrapper = styled(Flex, {
  boxShadow: '$1',
  p: '$10',
  borderRadius: '$md',
  w: '34rem',
  color: '$gray700',
  bgColor: '$box',
  border: '1px solid $line',

  [`.${darkTheme} &`]: {
    color: '$gray200',
  },
});

const Divider = styled(Box, {
  w: '$full',
  h: '1px',
  bg: '$gray200',
  my: '$4',

  [`.${darkTheme} &`]: {
    bgColor: '$gray600',
  },
});
