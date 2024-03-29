import { Loader } from '@/components/primitive';
import { Flex } from '@/components/primitive/flex';
import { Text } from '@/components/primitive/text';
import { styled } from '@/styles/stitches.config';

export function LoadingMessage() {
  return (
    <LoadingMessageWrapper
      direction='column'
      align='center'
      justify='center'
      isFull
      gap={10}
    >
      <Loader size='2xl' />
      <Text content='정보를 가져오는 중이에요!' size='xl' weight='bold' />
    </LoadingMessageWrapper>
  );
}

const LoadingMessageWrapper = styled(Flex, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bgColor: 'rgba(0, 0, 0, .5)',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,

  color: '$white',
});
