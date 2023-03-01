import { darkTheme, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';
import { Loader } from '@/components/primitive/Loader';
import { Text } from '@/components/primitive/Text';

function LoadingMessage() {
  return (
    <LoadingMessageWrapper direction="column" align="center" justify="center" isFull gap={5}>
      <Loader size="lg" />
      <Text content="정보를 가져오는 중이에요!" size="xl" weight="bold" />
    </LoadingMessageWrapper>
  );
}

const LoadingMessageWrapper = styled(Flex, {
  color: '$gray800',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

export default LoadingMessage;
