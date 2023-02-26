import { useCallback, useEffect, useState } from 'react';

import { Box } from '@/components/primitive/Box';
import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Grid } from '@/components/primitive/Grid';
import Layout from '@/components/layout/Layout';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/Timetable';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { styled } from '@/styles/stitches.config';
import { useEventSWR } from '@/hooks/useEventSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useTimetable } from '@/hooks/useTimetable';

interface EventResultProps {
  eventID: string;
}

function EventResult({ eventID }: EventResultProps) {
  const { event } = useEventSWR({ eventID });
  const { participants } = useParticipantsSWR({ eventID });

  const {
    timetable,
    completeTimetable,
    partitionGroups,
    handleTimetableChange,
    paintTimetable,
    convertIndexToDate,
    convertIndexToTime,
  } = useTimetable(event, participants);

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

  const handleTimetablePartitionSelect = useCallback(
    (timetablePartition: TimetablePartition) => {
      if (selectedTimetablePartition === timetablePartition) {
        setSelectedTimetablePartition(undefined);
      } else {
        setSelectedTimetablePartition(timetablePartition);
      }
    },
    [selectedTimetablePartition]
  );

  useEffect(() => {
    setSelectedParticipant(participants?.map((participant) => participant._id) ?? []);
  }, [participants]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participants]);

  return (
    <Layout>
      <Page>
        <Paper transparent>
          <ButtonWrapper align="center" justify="end" isFull>
            <Button size="xl" onClick={() => {}} radius="pill" color="primary">
              <Text content="결과 공유하기" color="white" size="lg" weight="bold" />
            </Button>
          </ButtonWrapper>
          <Grid columns={2} gap={20} align="start">
            <Card gap={10} direction="column" align="center">
              <Flex align="center" gap={2}>
                <CalendarIcon size={28} />
                <Text content={event?.title ?? ''} size="lg" weight="bold" />
              </Flex>
              <Flex isFull direction="column" align="end" gap={5}>
                <Text
                  content={`${participants?.length}/${event?.participantsNumber} 참여`}
                  size="xs"
                  color="darken200"
                />
                <Flex isFull gap={10}>
                  <Flex direction="column" gap={4}>
                    {participants?.map((participant) => (
                      <Badge
                        key={participant._id}
                        active={isSelected(participant._id)}
                        onClick={() => handleParticipantSelect(participant._id)}>
                        <Text
                          content={participant.name}
                          size="xs"
                          color={isSelected(participant._id) ? 'white' : 'darken200'}
                          weight="bold"
                        />
                      </Badge>
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
            </Card>
            <Flex direction="column" gap={10}>
              {partitionGroups.map((partitionGroup, rank) => (
                <Card key={rank} align="start" direction="column" gap={5}>
                  <Flex gap={4} align="center" isFull>
                    <RankWrapper>
                      <Text content={`${rank + 1}`} color="white" size="lg" weight="bold" />
                    </RankWrapper>
                    <UnderLineBox>
                      <Text
                        content={
                          partitionGroup[0].participantIDs.length === event?.participantsNumber
                            ? '모든 참여자가 약속했어요'
                            : `${partitionGroup[0].participantIDs.length}명의 참여자가 약속했어요`
                        }
                        size="sm"
                        color="darken200"
                        weight="bold"
                      />
                    </UnderLineBox>
                  </Flex>
                  <Flex direction="column" isFull>
                    {partitionGroup.map((partition) => (
                      <ListItem
                        key={partition.id}
                        gap={5}
                        selected={selectedTimetablePartition?.id === partition.id ? true : false}
                        onClick={() => handleTimetablePartitionSelect(partition)}>
                        <Text
                          content={`${convertIndexToDate(partition.col)}`}
                          color="primary"
                          weight="bold"
                        />
                        <Text
                          content={`${convertIndexToTime(
                            partition.startRow
                          )} 부터 ${convertIndexToTime(partition.endRow + 1)} 까지`}
                          color="darken200"
                        />
                      </ListItem>
                    ))}
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Grid>
        </Paper>
      </Page>
    </Layout>
  );
}

const Card = styled(Flex, {
  w: '$full',
  boxShadow: '$1',
  bg: 'rgba(255, 255, 255, 0.6)',
  p: '$15',
  borderRadius: '$lg',
});

const RankWrapper = styled(Flex, {
  justifyContent: 'center',
  alignItems: 'center',
  w: '$15',
  h: '$15',
  bgColor: '$primary',
  borderRadius: '$round',
  flexShrink: 0,
});

const UnderLineBox = styled(Box, {
  w: '$full',
  borderBottom: '1px solid $primary',
  py: '$3',
  px: '$4',
});

const Badge = styled(Flex, {
  w: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  px: '$6',
  py: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  userSelect: 'none',

  variants: {
    active: {
      true: { bg: '$darken200' },
      false: { bg: '$lighten300' },
    },
  },
});

const ButtonWrapper = styled(Flex, {
  mb: '$10',
});

const ListItem = styled(Flex, {
  alignItems: 'center',
  ml: '$18',
  p: '$8',
  borderRadius: '$md',
  cursor: 'pointer',
  userSelect: 'none',
  '@hover': {
    '&:hover': {
      bg: '$lighten400',
    },
  },

  variants: {
    selected: {
      true: { bg: '$lighten400' },
      false: { bg: 'transparent' },
    },
  },
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
