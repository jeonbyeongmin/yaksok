import { Event } from 'common/inerfaces/Event.interface';
import { logOnBrowser } from 'common/utils/log';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { updateParticipantAPI } from '@/api/participants/update-participant';
import ParticipationModal from '@/components/page/event/ParticipationModal';
import LoadingMessage from '@/components/page/LoadingMessage';
import Timetable from '@/components/page/Timetable';
import { Button, Flex, Icon, Page, Paper, Text } from '@/components/primitive';
import { makeToast } from '@/components/primitive/Toast';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useParticipantSWR } from '@/hooks/useParticipantSWR';
import { useTimetable } from '@/hooks/useTimetable';
import { getEventById } from '@/pages/api/events/[id]';
import { darkTheme, styled } from '@/styles/stitches.config';

interface EventProps {
  eventId: string;
  participantCID: string;
  event: Event;
}

export default function EventPage({
  eventId,
  participantCID,
  event,
}: EventProps) {
  const router = useRouter();
  const { t } = useTranslation(['common', 'event-page']);

  const [participantId, setParticipantId] = useState(participantCID ?? '');
  const [isLoading, setIsLoading] = useState(false);

  const { participant } = useParticipantSWR({ participantId });
  const { participants } = useParticipantsSWR({ queries: { eventId } });

  const { timetable, completeTimetable, handleTimetableChange } = useTimetable(
    event,
    participant,
  );

  const isPossibleCreateParticipant = useMemo(() => {
    if (!participants) return false;
    return participants.length < event.participantsNumber;
  }, [event, participants]);

  const handleParticipantIDChange = (participantID: string) => {
    setParticipantId(participantID);
  };

  const getAvailableIndexes = useCallback(() => {
    const availableIndexes: string[] = [];
    timetable.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col) {
          const index = `${rowIndex}-${colIndex}`;
          availableIndexes.push(index);
        }
      });
    });
    return availableIndexes;
  }, [timetable]);

  const handleShareButtonClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      makeToast({
        type: 'success',
        title: t('common:toast.copy-invite-link.title'),
        message: t('common:toast.copy-invite-link.message'),
      });
    } catch (error) {
      logOnBrowser(error);
    }
  }, [t]);

  const handleMoveToResultButtonClick = useCallback(() => {
    router.push(`/${eventId}/result`);
  }, [eventId, router]);

  const handleSubmitButtonClick = useCallback(async () => {
    try {
      setIsLoading(true);
      const availableIndexes = getAvailableIndexes();

      await updateParticipantAPI({ participantId }, { availableIndexes });

      handleMoveToResultButtonClick();
    } catch (error) {
      logOnBrowser(error);
    } finally {
      setIsLoading(false);
    }
  }, [getAvailableIndexes, handleMoveToResultButtonClick, participantId]);

  useEffect(() => {
    if (participantCID) setParticipantId(participantCID);
  }, [participantCID]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participant]);

  if (!participant) {
    return (
      <Page>
        <Paper>
          <LoadingMessage />
        </Paper>
        {event && (
          <ParticipationModal
            eventId={eventId}
            eventTitle={event.title}
            participantID={participantId}
            handleParticipantIDChange={handleParticipantIDChange}
            isPossibleCreateParticipant={isPossibleCreateParticipant}
          />
        )}
      </Page>
    );
  }

  return (
    <Page>
      <Paper>
        <Inner direction='column'>
          <Flex direction='column' isFull gap={3}>
            <Flex align='center' justify='end' isFull>
              <Button
                onClick={handleShareButtonClick}
                variant='outline'
                colorScheme='gray'
                leftElement={<Icon name='share' size={16} />}
                radius='pill'
                size='sm'
                shadow
              >
                <Text content={t('event-page:button.invite')} size='sm' />
              </Button>
            </Flex>
            <Title direction='column'>
              <Flex align='center' gap={4}>
                <Icon name='calendar' size={25} />
                <Text content={event.title} size='2xl' weight='bold' />
              </Flex>
              {participant && (
                <Flex gap={2}>
                  <Text content={participant.name} weight='bold' size='sm' />
                  <Text content={t('event-page:timetable.owner')} size='sm' />
                </Flex>
              )}
              <Text content={t('event-page:timetable.description')} size='sm' />
            </Title>
          </Flex>
          <Timetable
            startDate={event.startDate}
            endDate={event.endDate}
            startTime={event.startTime}
            endTime={event.endTime}
            timetable={timetable}
            handleTimetableChange={handleTimetableChange}
          />

          <Flex direction='column' isFull gap={5}>
            <ButtonWrapper justify='center' isFull>
              <Button
                variant='link'
                colorScheme='gray'
                rightElement={<Icon name='caret-right' />}
                onClick={handleMoveToResultButtonClick}
              >
                <Text
                  content={t('event-page:button.move-to-result')}
                  size='sm'
                />
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
        </Inner>
      </Paper>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  let participantCID = null;

  const cookies = nookies.get(ctx);

  if (cookies[`${id}-participantID`]) {
    participantCID = cookies[`${id}-participantID`];
  }

  const event = await getEventById(id);
  if (!event) return { notFound: true };

  return {
    props: {
      event,
      eventId: id,
      participantCID,
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'common',
        'event-page',
      ])),
    },
  };
};

const Title = styled(Flex, {
  'gap': '$2',
  '@bp3': { gap: '$3' },
});

const Inner = styled(Flex, {
  'color': '$gray800',

  'w': '$full',
  'px': '$5',
  'gap': '$12',

  '@bp2': {
    minW: '$300',
    maxW: '$300',
    gap: '$15',
  },
  '@bp3': {
    minW: '$400',
    maxW: '$400',
  },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

const ButtonWrapper = styled(Flex, {
  '&:not(:last-child)': {
    pt: '$20',
  },
});
