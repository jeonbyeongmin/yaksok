import { darkTheme, styled } from '@/styles/stitches.config';
import { useCallback, useEffect, useState } from 'react';

import { Badge } from '@/components/primitive/Badge';
import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Card } from '@/components/primitive/Card';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Grid } from '@/components/primitive/Grid';
import Layout from '@/components/layout/Layout';
import LoadingMessage from '@/components/page/LoadingMessage';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import PartitionGroup from '@/components/page/event-result/PartitionGroup';
import { RefreshIcon } from '@/components/assets/RefreshIcon';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/page/Timetable';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { useEventSWR } from '@/hooks/useEventSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useRouter } from 'next/router';
import { useTimetable } from '@/hooks/useTimetable';

interface EventResultProps {
  eventID: string;
}

function EventResult({ eventID }: EventResultProps) {
  const router = useRouter();

  const { event } = useEventSWR({ eventID });
  const { participants, reload, isLoading } = useParticipantsSWR({ eventID });

  const { timetable, completeTimetable, partitionGroups, handleTimetableChange, paintTimetable } =
    useTimetable(event, participants);

  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
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

  function scrollToTop() {}

  const handleTimetablePartitionSelect = useCallback(
    (partition: TimetablePartition) => {
      scrollToTop();
      if (selectedTimetablePartition === partition) {
        setSelectedTimetablePartition(undefined);
      } else {
        setSelectedTimetablePartition(partition);
      }
    },
    [selectedTimetablePartition]
  );

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // setIsToastOpen(true);
      alert('클립보드에 링크를 복사했어요');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
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
    <Layout>
      <Page>
        <Paper transparent>
          <ButtonWrapper align="center" justify="end" isFull gap={5}>
            <Button size="xl" onClick={handleEditButtonClick} radius="pill" color="primary">
              <Text content="내 시간표 수정하기" color="white" size="lg" weight="bold" />
            </Button>
            <Button size="xl" onClick={handleCopyClipBoard} radius="pill" color="primary">
              <Text content="결과 공유하기" color="white" size="lg" weight="bold" />
            </Button>
          </ButtonWrapper>
          <Grid columns={2} gap={10} align="start">
            <Card direction="column">
              <CardInner align="center" gap={5}>
                <Flex isFull justify="end">
                  <Button
                    onClick={reload}
                    leftElement={<RefreshIcon size={12} />}
                    size="xs"
                    color="light"
                    radius="pill">
                    <Text content="다시불러오기" size="xs" />
                  </Button>
                </Flex>
                <Flex align="center" gap={3}>
                  <CalendarIcon size={28} />
                  <Text content={event?.title ?? ''} size="lg" weight="bold" />
                </Flex>
                <Flex isFull direction="column" align="end" gap={5}>
                  <Text
                    content={`${participants?.length}/${event?.participantsNumber} 참여`}
                    size="xs"
                  />
                  <Flex isFull gap={10}>
                    <Flex direction="column" gap={4}>
                      {participants?.map((participant) => (
                        <Badge
                          key={participant._id}
                          active={isSelected(participant._id)}
                          onClick={() => handleParticipantSelect(participant._id)}
                          content={participant.name}></Badge>
                      ))}
                    </Flex>
                    <Timetable
                      startDate={event?.startDate ?? new Date()}
                      endDate={event?.endDate ?? new Date()}
                      startTime={event?.startTime ?? 0}
                      endTime={event?.endTime ?? 0}
                      timetable={timetable}
                      participantsNumber={participants?.length}
                      cellHeight="sm"
                      selectedTimetablePartition={selectedTimetablePartition}
                      isSimple
                    />
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
                    selectedTimetablePartition={selectedTimetablePartition}
                    handleTimetablePartitionSelect={handleTimetablePartitionSelect}
                  />
                ))}
            </Flex>
          </Grid>
        </Paper>
      </Page>
    </Layout>
  );
}

const CardInner = styled(Flex, {
  flexDirection: 'column',
  w: '$full',
  p: '$15',
  pt: '$10',
  color: '$black',

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

const ButtonWrapper = styled(Flex, {
  mb: '$10',
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
