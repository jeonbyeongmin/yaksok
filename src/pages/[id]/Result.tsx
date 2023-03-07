import { Card, CardInner } from '@/components/primitive/Card';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/primitive/Badge';
import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Grid } from '@/components/primitive/Grid';
import { Layout } from '@/components/layout/Layout';
import LoadingMessage from '@/components/page/LoadingMessage';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import PartitionGroup from '@/components/page/event-result/PartitionGroup';
import { RefreshIcon } from '@/components/assets/RefreshIcon';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/page/Timetable';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { makeToast } from '@/components/primitive/Toast';
import { styled } from '@/styles/stitches.config';
import { useEventSWR } from '@/hooks/useEventSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useRouter } from 'next/router';
import { useTimetable } from '@/hooks/useTimetable';

interface EventResultProps {
  eventID: string;
}

function EventResult({ eventID }: EventResultProps) {
  const router = useRouter();

  const currentRef = useRef<HTMLDivElement>(null);
  const { event } = useEventSWR({ eventID });
  const { participants, reload } = useParticipantsSWR({ eventID });

  const { timetable, completeTimetable, partitionGroups, handleTimetableChange, paintTimetable } =
    useTimetable(event, participants);

  const [selectedParticipant, setSelectedParticipant] = useState<string[]>([]);
  const [selectedTimetablePartition, setSelectedTimetablePartition] =
    useState<TimetablePartition>();

  const isSelected = useCallback(
    (participantID: string) => {
      return selectedParticipant.includes(participantID);
    },
    [selectedParticipant]
  );

  const handleParticipantSelect = useCallback(
    (participantID: string) => {
      if (!participants) return;
      if (selectedParticipant.includes(participantID)) {
        setSelectedParticipant((selectedParticipant) => {
          const newSelectedParticipant = selectedParticipant.filter((id) => id !== participantID);
          const newSelectedParticipants = participants.filter((participant) =>
            newSelectedParticipant.includes(participant._id)
          );
          const newTimetable = paintTimetable(newSelectedParticipants);
          handleTimetableChange(newTimetable);

          return newSelectedParticipant;
        });
      } else {
        setSelectedParticipant((selectedParticipant) => {
          const newSelectedParticipant = [...selectedParticipant, participantID];
          const newSelectedParticipants = participants.filter((participant) =>
            newSelectedParticipant.includes(participant._id)
          );
          const newTimetable = paintTimetable(newSelectedParticipants);
          handleTimetableChange(newTimetable);

          return newSelectedParticipant;
        });
      }
    },
    [handleTimetableChange, paintTimetable, participants, selectedParticipant]
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
    [scrollToTop, selectedTimetablePartition]
  );

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      makeToast({
        type: 'success',
        message: '약속 결과 링크를 클립보드에 복사했어요!',
      });
    } catch (error) {
      makeToast({
        type: 'error',
        message: '약속 결과 링크를 복사를 실패했어요',
      });
    }
  };

  const handleReloadButtonClick = async () => {
    try {
      await reload();

      makeToast({
        type: 'success',
        message: '참여자가 저장한 데이터를 다시 불러왔어요!',
      });
    } catch (error) {}
  };

  const handleEditButtonClick = () => {
    router.push(`/${eventID}`);
  };

  useEffect(() => {
    setSelectedParticipant(participants?.map((participant) => participant._id) ?? []);
  }, [participants]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participants]);

  if (!event || !participants) {
    return (
      <Layout>
        <Page>
          <LoadingMessage />
        </Page>
      </Layout>
    );
  }

  return (
    <Layout ref={currentRef}>
      <Page>
        <Paper transparent>
          <ButtonWrapper align="center" justify="end" isFull>
            <Button size="xl" onClick={handleCopyClipBoard} radius="pill" color="primary">
              <Text content="결과 공유하기" color="white" size="md" weight="bold" />
            </Button>
          </ButtonWrapper>

          <CustomGrid align="start">
            <Card direction="column">
              <CardInner align="start" gap={5}>
                <Flex isFull justify="start" gap={3}>
                  <ButtonWrapper align="center" justify="start" isFull gap={3}>
                    <Button
                      onClick={handleReloadButtonClick}
                      leftElement={<RefreshIcon size={12} />}
                      size="xs"
                      color="light"
                      radius="pill"
                      noBlank>
                      <Text content="다시 불러오기" size="xs" />
                    </Button>
                    <Button
                      onClick={handleEditButtonClick}
                      size="xs"
                      color="light"
                      radius="pill"
                      noBlank>
                      <Text content="내 시간표 수정하기" size="xs" />
                    </Button>
                  </ButtonWrapper>
                </Flex>
                <Flex align="center" gap={3}>
                  <CalendarIcon size={28} />
                  <Text content={event?.title ?? ''} size="lg" weight="bold" />
                </Flex>
                <Text
                  content={`${participants?.length}/${event?.participantsNumber} 참여`}
                  size="xs"
                />
                <Flex isFull gap={10}>
                  <Timetable
                    startDate={event.startDate}
                    endDate={event.endDate}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    timetable={timetable}
                    participantsNumber={participants.length}
                    cellHeight="sm"
                    selectedTimetablePartition={selectedTimetablePartition}
                    isSimple
                  />
                  <Flex direction="column" gap={4}>
                    {participants?.map((participant) => (
                      <Badge
                        key={participant._id}
                        active={isSelected(participant._id)}
                        onClick={() => handleParticipantSelect(participant._id)}
                        content={participant.name}
                      />
                    ))}
                  </Flex>
                </Flex>
              </CardInner>
            </Card>

            <Flex direction="column" gap={10}>
              {event &&
                partitionGroups.map((partitionGroup, rank) => (
                  <PartitionGroup
                    key={rank}
                    rank={rank}
                    event={event}
                    partitionGroup={partitionGroup}
                    participants={participants}
                    selectedTimetablePartition={selectedTimetablePartition}
                    handleTimetablePartitionSelect={handleTimetablePartitionSelect}
                  />
                ))}
            </Flex>
          </CustomGrid>
        </Paper>
      </Page>
    </Layout>
  );
}

const CustomGrid = styled(Grid, {
  gap: '$5',
  '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
  '@bp2': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@bp3': { gridTemplateColumns: 'repeat(2, 1fr)' },
});

const ButtonWrapper = styled(Flex, {
  mb: '$5',

  '@bp1': { mb: '$10' },
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  return {
    props: {
      eventID: id,
    },
  };
};

export default EventResult;
