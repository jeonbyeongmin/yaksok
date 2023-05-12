import { toast } from 'react-toastify';

import { Flex } from '@/components/primitive/flex';
import { Text } from '@/components/primitive/text';
import { styled } from '@/styles/stitches.config';

interface ToastProps {
  title?: string;
  message: string;
}

type MakeToastParams = {
  type: 'success' | 'error' | 'info' | 'warning';
} & ToastProps;

const Wrapper = styled(Flex, {
  px: '$2',
});

const ToastComponent = ({ title, message }: ToastProps) => {
  return (
    <Wrapper direction='column' gap={2}>
      {title && <Text content={title} weight='bold' />}
      <Text content={message} size='sm' />
    </Wrapper>
  );
};

export const makeToast = ({ title, message, type = 'success' }: MakeToastParams) => {
  return toast(<ToastComponent title={title} message={message} />, {
    type,
  });
};
