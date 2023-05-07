import { Event } from 'common/inerfaces/Event.interface';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import PartitionGroup from '@/components/page/event-result/PartitionGroup';
import LoadingMessage from '@/components/page/LoadingMessage';
import Timetable from '@/components/page/Timetable';
import {
  Badge,
  Button,
  Flex,
  Grid,
  Icon,
  Page,
  Paper,
  Text,
} from '@/components/primitive';
import { Panel, PanelInner } from '@/components/primitive/Panel';
import { makeToast } from '@/components/primitive/Toast';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useTimetable } from '@/hooks/useTimetable';
import { getEventById } from '@/pages/api/events/[id]';
import { styled } from '@/styles/stitches.config';

interface EventResultProps {
  eventId: string;
  event: Event;
}

function EventResult({ eventId, event }: EventResultProps) {
  const router = useRouter();
  const { t } = useTranslation(['common', 'result-page']);

  const currentRef = useRef<HTMLDivElement>(null);
  const { participants, reload } = useParticipantsSWR({
    queries: { eventId },
  });
  console.log(
    '🚀 ~ file: result.tsx:43 ~ EventResult ~ participants:',
    participants,
  );

  const {
    timetable,
    completeTimetable,
    partitionGroups,
    handleTimetableChange,
    paintTimetable,
  } = useTimetable(event, participants);

  const [selectedParticipant, setSelectedParticipant] = useState<string[]>([]);
  const [selectedTimetablePartition, setSelectedTimetablePartition] =
    useState<TimetablePartition>();

  const isSelected = useCallback(
    (participantID: string) => {
      return selectedParticipant.includes(participantID);
    },
    [selectedParticipant],
  );

  const handleParticipantSelect = useCallback(
    (participantID: string) => {
      if (!participants) return;

      const newSelectedParticipant = selectedParticipant.includes(participantID)
        ? selectedParticipant.filter((id) => id !== participantID)
        : [...selectedParticipant, participantID];

      const newSelectedParticipants = participants.filter((participant) =>
        newSelectedParticipant.includes(participant._id),
      );
      const newTimetable = paintTimetable(newSelectedParticipants);
      handleTimetableChange(newTimetable);

      setSelectedParticipant(newSelectedParticipant);
    },
    [handleTimetableChange, paintTimetable, participants, selectedParticipant],
  );

  const scrollToTop = useCallback(() => {
    if (currentRef.current) {
      currentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleTimetablePartitionSelect = useCallback(
    (partition: TimetablePartition) => {
      scrollToTop();
      if (selectedTimetablePartition === partition) {
        setSelectedTimetablePartition(undefined);
      } else {
        setSelectedTimetablePartition(partition);
      }
    },
    [scrollToTop, selectedTimetablePartition],
  );

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

  useEffect(() => {
    setSelectedParticipant(
      participants?.map((participant) => participant._id) ?? [],
    );
  }, [participants]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participants]);

  if (!event || !participants) {
    return (
      <Page>
        <LoadingMessage />
      </Page>
    );
  }

  return (
    <Page ref={currentRef}>
      <Paper transparent>
        <ButtonWrapper align='center' justify='end' isFull color='white'>
          <Button
            rightElement={<Icon name='caret-right' />}
            onClick={handleCopyClipBoard}
            radius='pill'
          >
            <Text
              content={t('result-page:button.share')}
              color='white'
              weight='bold'
            />
          </Button>
        </ButtonWrapper>

        <CustomGrid align='start'>
          <Panel direction='column'>
            <PanelInner align='start' gap={5}>
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
              <Flex align='center' gap={3}>
                <Icon name='calendar' size={20} />
                <Text content={event?.title ?? ''} size='lg' weight='bold' />
              </Flex>
              <Text
                content={`${participants?.length}/${
                  event?.participantsNumber
                } ${t('result-page:timetable.participate')}`}
                size='xs'
              />
              <Flex isFull gap={7}>
                <Timetable
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  timetable={timetable}
                  participantsNumber={participants.length}
                  cellHeight='sm'
                  selectedTimetablePartition={selectedTimetablePartition}
                  isSimple
                />
                <Flex direction='column' gap={5}>
                  {participants?.map((participant) => (
                    <Badge
                      key={participant._id}
                      size='sm'
                      active={isSelected(participant._id)}
                      onClick={() => handleParticipantSelect(participant._id)}
                      content={participant.name}
                    />
                  ))}
                </Flex>
              </Flex>
            </PanelInner>
          </Panel>

          <Flex direction='column' gap={6}>
            {event &&
              partitionGroups.map((partitionGroup, rank) => (
                <PartitionGroup
                  key={rank}
                  rank={rank}
                  event={event}
                  partitionGroup={partitionGroup}
                  participants={participants}
                  selectedTimetablePartition={selectedTimetablePartition}
                  handleTimetablePartitionSelect={
                    handleTimetablePartitionSelect
                  }
                />
              ))}
          </Flex>
        </CustomGrid>
      </Paper>
    </Page>
  );
}

const CustomGrid = styled(Grid, {
  'gap': '$8',
  '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
  '@bp2': { gridTemplateColumns: 'repeat(2, 1fr)' },
});

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const event = await getEventById(id);
  if (!event) return { notFound: true };

  return {
    props: {
      eventId: id,
      event,
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'common',
        'result-page',
      ])),
    },
  };
};

export default EventResult;
