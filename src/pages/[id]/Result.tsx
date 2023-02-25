import { useCallback, useEffect, useState } from 'react';

import { Box } from '@/components/primitive/Box';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Grid } from '@/components/primitive/Grid';
import Layout from '@/components/Layout';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/Timetable';
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

  const { timetable, completeTimetable, partitionByRank, handleTimetableChange, paintTimetable } =
    useTimetable(event, participants);

  const [selectedParticipant, setSelectedParticipant] = useState<string[]>([]);

  const isSelected = useCallback(
    (participantID: string) => {
      return selectedParticipant.includes(participantID);
    },
    [selectedParticipant]
  );

  const handleSelectParticipant = useCallback(
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
          <Grid columns={2} gap={20}>
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
                        onClick={() => handleSelectParticipant(participant._id)}>
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
                    isSimple
                  />
                </Flex>
              </Flex>
            </Card>
            <Flex direction="column" gap={10}>
              {partitionByRank.map((numberOfParticipantsPartition, rank) => (
                <Card key={rank} align="start" direction="column" gap={10}>
                  <Flex gap={4} align="center" isFull>
                    <RankWrapper>
                      <Text content={`${rank + 1}`} color="white" size="lg" weight="bold" />
                    </RankWrapper>
                    <UnderLineBox>
                      <Text
                        content={`${numberOfParticipantsPartition[0].participantIDs.length}명의 참여자가 약속했어요`}
                        size="sm"
                        color="darken200"
                        weight="bold"
                      />
                    </UnderLineBox>
                  </Flex>
                  <Flex direction="column">
                    {numberOfParticipantsPartition.map((partition, index) => (
                      <Flex key={index} gap={5}>
                        <Text
                          content={`col ${partition.col} - row ${partition.startRow} ~ ${partition.endRow}`}
                          size="xs"
                          color="darken200"
                        />
                        <Text
                          content={`${partition.participantIDs.length}명`}
                          size="xs"
                          color="darken200"
                        />
                      </Flex>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  return {
    props: {
      eventID: id,
    },
  };
};

export default EventResult;
