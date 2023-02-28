import { Flex } from '@/components/primitive/Flex';
import { styled } from '@/styles/stitches.config';

export const Card = styled(Flex, {
  w: '$full',
  boxShadow: '$1',
  borderRadius: '$lg',
  bg: '$glass',
});
