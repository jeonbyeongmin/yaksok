import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Button, Flex, Icon, Text } from '@/components/primitive';
import { makeToast } from '@/components/primitive/Toast';
import { useEventId } from '@/contexts/event-id-context';
import { useParticipantsDispatch } from '@/contexts/participants-context';
import { styled } from '@/styles/stitches.config';

export function EventResultCalendarPanelButtons() {
  const router = useRouter();
  const eventId = useEventId();
  const { t } = useTranslation(['common', 'result-page']);

  const { reload } = useParticipantsDispatch();

  const handleReloadButtonClick = async () => {
    try {
      await reload();

      makeToast({
        type: 'success',
        title: t('common:toast.reload-event.title'),
        message: t('common:toast.reload-event.message'),
      });
    } catch (error) {
      makeToast({
        type: 'error',
        title: t('common:toast.reload-event-fail.title'),
        message: t('common:toast.reload-event-fail.message'),
      });
    }
  };

  const handleEditButtonClick = () => {
    router.push(`/${eventId}`);
  };

  return (
    <ButtonWrapper align='center' justify='start' isFull gap={2}>
      <Button
        onClick={handleReloadButtonClick}
        leftElement={<Icon name='refresh' size={12} />}
        size='xs'
        variant='outline'
        colorScheme='gray'
        radius='pill'
      >
        <Text content={t('result-page:button.reload')} size='xs' />
      </Button>
      <Button
        onClick={handleEditButtonClick}
        size='xs'
        variant='outline'
        colorScheme='gray'
        radius='pill'
      >
        <Text content={t('result-page:button.edit')} size='xs' />
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
