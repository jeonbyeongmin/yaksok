import { useTranslation } from 'next-i18next';

import { Button, Flex, Icon, Text } from '@/components/primitive';
import { makeToast } from '@/components/primitive/Toast';
import { styled } from '@/styles/stitches.config';

export function EventResultHead() {
  const { t } = useTranslation(['common', 'result-page']);

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      makeToast({
        type: 'success',
        title: t('common:toast.copy-result-link.title'),
        message: t('common:toast.copy-result-link.message'),
      });
    } catch (error) {
      makeToast({
        type: 'error',
        title: t('common:toast.copy-result-link-fail.title'),
        message: t('common:toast.copy-result-link-fail.message'),
      });
    }
  };

  return (
    <ButtonWrapper align='center' justify='end' isFull color='white'>
      <Button
        rightElement={<Icon name='caret-right' />}
        onClick={handleCopyClipBoard}
        radius='pill'
      >
        <Text content={t('result-page:button.share')} color='white' weight='bold' />
      </Button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled(Flex, {
  'mb': '$5',
  '@bp1': { mb: '$10' },

  'variants': {
    color: {
      white: {
        color: '$white',
      },
    },
  },
});
