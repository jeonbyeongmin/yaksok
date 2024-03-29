import type { TimetablePartition } from '@/types/timetable.type';

import { convertIndexToDate, convertIndexToTime } from 'common/utils/convert';
import { useMemo, useState } from 'react';

import { Flex, IconButton, Text } from '@/components/primitive';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/primitive/popover';
import { useEvent } from '@/contexts/event-context';
import { useParticipants } from '@/contexts/participants-context';
import { useHover } from '@/hooks/use-hover';
import { darkTheme, styled } from '@/styles/stitches.config';

interface PartitionItemProps {
  partition: TimetablePartition;
  selectedPartition: TimetablePartition | undefined;
  handleTimetablePartitionSelect: (partition: TimetablePartition) => void;
}

export function PartitionItem({
  partition,
  selectedPartition,
  handleTimetablePartitionSelect,
}: PartitionItemProps) {
  const [ref, value] = useHover();

  const [open, setOpen] = useState(false);

  const { event } = useEvent();
  const { participants } = useParticipants();

  const participantsInfo = useMemo(() => {
    const participantsInfo = [];
    for (const participantID of partition.participantIDs) {
      const participant = participants.find((p) => p._id === participantID);
      if (participant) {
        participantsInfo.push(participant);
      }
    }
    return participantsInfo;
  }, [partition.participantIDs, participants]);

  const handleClick = () => {
    handleTimetablePartitionSelect(partition);
  };

  return (
    <ListItem
      ref={ref}
      justify='between'
      selected={selectedPartition?.id === partition.id}
      onClick={handleClick}
    >
      <Flex gap={5}>
        <Text
          content={`${convertIndexToDate(partition.col, event?.startDate ?? new Date(), {
            isShort: true,
          })}`}
          color='primary100'
          weight='bold'
        />
        <Text
          content={`${convertIndexToTime(
            partition.startRow,
            event?.startTime ?? 0,
          )} ~ ${convertIndexToTime(partition.endRow + 1, event?.startTime ?? 0)}`}
        />
      </Flex>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
          <IconButton
            name='person'
            variant='embossing'
            colorScheme='primary'
            visible={value || open}
          />
        </PopoverTrigger>
        <PopoverContent align='end' onClick={(e) => e.stopPropagation()}>
          <Flex direction='column' isFull gap={5}>
            {participantsInfo.map((participantInfo) => (
              <Text key={participantInfo._id} content={participantInfo.name} />
            ))}
          </Flex>
        </PopoverContent>
      </Popover>
    </ListItem>
  );
}

const ListItem = styled(Flex, {
  'alignItems': 'center',
  'ml': '$18',
  'px': '$5',
  'py': '$8',
  'mb': '$1',
  'borderRadius': '$lg',
  'cursor': 'pointer',
  'userSelect': 'none',
  'transition': 'padding 0.2s ease-in-out',
  'color': '$gray800',

  [`.${darkTheme} &`]: {
    color: '$white',
  },

  '@hover': {
    '&:hover': {
      pl: '$10',
    },
  },

  'variants': {
    selected: {
      true: {
        pl: '$10',
        bg: '$lighten300',

        [`.${darkTheme} &`]: {
          bg: '$darken200',
        },
      },
      false: { bg: 'transparent' },
    },
  },
});
