import { logOnBrowser } from 'common/utils/log';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { updateParticipantAPI } from '@/api/participants/update-participant';
import { Button, Flex, Icon, Text } from '@/components/primitive';
import { useEventId } from '@/contexts/event-id-context';
import { styled } from '@/styles/stitches.config';
import { convertTableToIndexStrings } from '@/utils/timetable';

interface Props {
  timetableValue: boolean[][];
  participantId: string;
}

export function SubmitButton({ timetableValue, participantId }: Props) {
  const router = useRouter();
  const eventId = useEventId();

  const { t } = useTranslation(['common', 'event-page']);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoveToResultButtonClick = () => {
    router.push(`/${eventId}/result`);
  };

  const handleSubmitButtonClick = async () => {
    try {
      setIsLoading(true);
      const availableIndexes = convertTableToIndexStrings(timetableValue);
      await updateParticipantAPI({ participantId }, { availableIndexes });

      handleMoveToResultButtonClick();
    } catch (error) {
      logOnBrowser(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction='column' isFull gap={5}>
      <ButtonWrapper justify='center' isFull>
        <Button
          variant='link'
          colorScheme='gray'
          rightElement={<Icon name='caret-right' />}
          onClick={handleMoveToResultButtonClick}
        >
          <Text content={t('event-page:button.move-to-result')} size='sm' />
        </Button>
      </ButtonWrapper>
      <ButtonWrapper justify='center' isFull>
        <Button
          radius='pill'
          size='2xl'
          onClick={handleSubmitButtonClick}
          isLoading={isLoading}
        >
          <Text
            content={t('event-page:button.submit')}
            color='white'
            size='xl'
            weight='bold'
          />
        </Button>
      </ButtonWrapper>
    </Flex>
  );
}

const ButtonWrapper = styled(Flex, {
  '&:not(:last-child)': {
    pt: '$20',
  },
});
