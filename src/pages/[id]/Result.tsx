import { useCallback, useEffect, useMemo, useState } from 'react';

import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Grid } from '@/components/primitive/Grid';
import Layout from '@/components/Layout';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import { ParticipantData } from '@/api/participants/read-participants';
import { Text } from '@/components/primitive/Text';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import { deepCopy2DArray } from '@/utils/copy';
import { styled } from '@/styles/stitches.config';
import { useEvent } from '@/hooks/useEvent';
import { useParticipants } from '@/hooks/useParticipants';

interface EventResultProps {
  eventID: string;
}

function EventResult({ eventID }: EventResultProps) {
  const { event } = useEvent({ eventID });
  const { participants } = useParticipants({ eventID });

  const [timeTable, setTimeTable] = useState<number[][]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<string[]>([]);

  const plainTimeTable = useMemo(() => {
    if (!event) return [];
    const { startDate, endDate, startTime, endTime } = event;
    const newTimeTable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0)
    );

    return newTimeTable;
  }, [event]);

  const paintTimeTable = useCallback(
    (newParticipants: ParticipantData[], timeTable: number[][]) => {
      newParticipants.forEach((participant) => {
        participant.availableIndexes.forEach((index) => {
          const [rowIndex, colIndex] = index.split('-');
          timeTable[Number(rowIndex)][Number(colIndex)] += 1;
        });
      });
    },
    []
  );

  const isSelected = useCallback(
    (participantID: string) => {
      return selectedParticipant.includes(participantID);
    },
    [selectedParticipant]
  );

  const handleSelectParticipant = useCallback(
    (participantID: string) => {
      if (!participants) return;

      const newTimeTable = deepCopy2DArray(plainTimeTable);

      if (selectedParticipant.includes(participantID)) {
        setSelectedParticipant((selectedParticipant) => {
          const newSelectedParticipant = selectedParticipant.filter(
            (id) => id !== participantID
          );
          const newSelectedParticipants = participants.filter((participant) =>
            newSelectedParticipant.includes(participant._id)
          );
          paintTimeTable(newSelectedParticipants, newTimeTable);

          return newSelectedParticipant;
        });
      } else {
        setSelectedParticipant((selectedParticipant) => {
          const newSelectedParticipant = [
            ...selectedParticipant,
            participantID,
          ];
          const newSelectedParticipants = participants.filter((participant) =>
            newSelectedParticipant.includes(participant._id)
          );
          paintTimeTable(newSelectedParticipants, newTimeTable);

          return newSelectedParticipant;
        });
      }
      setTimeTable(newTimeTable);
    },
    [paintTimeTable, participants, plainTimeTable, selectedParticipant]
  );

  useEffect(() => {
    setSelectedParticipant(
      participants?.map((participant) => participant._id) ?? []
    );
  }, [participants]);

  useEffect(() => {
    if (!participants) return;
    const newTimeTable = deepCopy2DArray(plainTimeTable);
    paintTimeTable(participants, newTimeTable);
    setTimeTable(newTimeTable);
  }, [paintTimeTable, participants, plainTimeTable]);

  return (
    <Layout>
      <Page>
        <Paper transparent>
          <Grid columns={2} gap={20}>
            <Card gap={10}>
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
                        onClick={() => handleSelectParticipant(participant._id)}
                      >
                        <Text
                          content={participant.name}
                          size="xs"
                          color={
                            isSelected(participant._id)
                              ? 'lighten300'
                              : 'darken200'
                          }
                        />
                      </Badge>
                    ))}
                  </Flex>
                  <TimeTable
                    startDate={event?.startDate ?? new Date()}
                    endDate={event?.endDate ?? new Date()}
                    startTime={event?.startTime ?? 0}
                    endTime={event?.endTime ?? 0}
                    timeTable={timeTable}
                    participantsNumber={participants?.length}
                    cellHeight="sm"
                    isSimple
                  />
                </Flex>
              </Flex>
            </Card>
            <Card></Card>
          </Grid>
        </Paper>
      </Page>
    </Layout>
  );
}

const Card = styled(Flex, {
  w: '$full',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '$1',
  bg: 'rgba(255, 255, 255, 0.6)',
  p: '$15',
  borderRadius: '$lg',
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
