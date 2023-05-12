import type { TimetablePartition } from '@/types/timetable.type';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LoadingMessage } from '@/components/loading-message';
import { EventResultCalendarPanel } from '@/components/page/event-result/event-result-calendar-panel';
import { PartitionGroup } from '@/components/page/event-result/partition-group';
import { Flex, Grid } from '@/components/primitive';
import { useEvent } from '@/contexts/event-context';
import { useParticipants } from '@/contexts/participants-context';
import { styled } from '@/styles/stitches.config';
import { generatePartitionGroups } from '@/utils/participant';
import { generateTimetable } from '@/utils/timetable';

interface Props {}

export function EventResultContent({}: Props) {
  const { participants, isLoading: isParticipantLoading } = useParticipants();
  const { event, isLoading: isEventLoading } = useEvent();

  const [timetable, setTimetable] = useState<number[][]>([]);
  const [selectedPartition, setSelectedPartition] = useState<TimetablePartition>();

  const partitionGroups = useMemo(() => {
    if (!participants) {
      return [];
    }
    return generatePartitionGroups(participants);
  }, [participants]);

  const handleTimetableChange = useCallback((timetable: number[][]) => {
    setTimetable(timetable);
  }, []);

  const handleTimetablePartitionSelect = useCallback(
    (partition: TimetablePartition) => {
      if (selectedPartition === partition) {
        setSelectedPartition(undefined);
      } else {
        setSelectedPartition(partition);
      }
    },
    [selectedPartition],
  );

  useEffect(() => {
    if (event) {
      setTimetable(generateTimetable({ event, participants }));
    }
  }, [event, participants]);

  return (
    <>
      {isEventLoading || isParticipantLoading ? (
        <LoadingMessage />
      ) : (
        <CustomGrid align='start'>
          <EventResultCalendarPanel
            timetable={timetable}
            selectedPartition={selectedPartition}
            handleTimetableChange={handleTimetableChange}
          />

          <Flex direction='column' gap={6}>
            {partitionGroups.map((partitionGroup, rank) => (
              <PartitionGroup
                key={rank}
                rank={rank}
                partitionGroup={partitionGroup}
                selectedPartition={selectedPartition}
                handleTimetablePartitionSelect={handleTimetablePartitionSelect}
              />
            ))}
          </Flex>
        </CustomGrid>
      )}
    </>
  );
}

const CustomGrid = styled(Grid, {
  'gap': '$8',
  '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
  '@bp2': { gridTemplateColumns: 'repeat(2, 1fr)' },
});
