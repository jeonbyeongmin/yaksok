import { Flex, IconButton, Text } from '@/components/primitive';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/primitive/Popover';
import { convertIndexToDate, convertIndexToTime } from 'common/utils/convert';
import { darkTheme, styled } from '@/styles/stitches.config';
import { useMemo, useState } from 'react';

import { Event } from 'common/inerfaces/Event.interface';
import { Participant } from 'common/inerfaces/Participant.interface';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { useHover } from '@/hooks/useHover';

interface PartitionItemProps {
  partition: TimetablePartition;
  event: Event;
  selectedTimetablePartition: TimetablePartition | undefined;
  handleTimetablePartitionSelect: (partition: TimetablePartition) => void;
  participants: Participant[];
}

function PartitionItem({
  partition,
  event,
  selectedTimetablePartition,
  handleTimetablePartitionSelect,
  participants,
}: PartitionItemProps) {
  const [ref, value] = useHover();

  const [open, setOpen] = useState(false);

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
      justify="between"
      selected={selectedTimetablePartition?.id === partition.id ? true : false}
      onClick={handleClick}>
      <Flex gap={5}>
        <Text
          content={`${convertIndexToDate(partition.col, event.startDate, { isShort: true })}`}
          color="primary100"
          weight="bold"
        />
        <Text
          content={`${convertIndexToTime(
            partition.startRow,
            event.startTime ?? 0
          )} ~ ${convertIndexToTime(partition.endRow + 1, event.startTime)}`}
        />
      </Flex>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={(e) => e.stopPropagation()}>
          <IconButton
            name="person"
            variant="embossing"
            colorScheme="primary"
            visible={value || open}
          />
        </PopoverTrigger>
        <PopoverContent align="end" onClick={(e) => e.stopPropagation()}>
          <Flex direction="column" isFull gap={5}>
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
  alignItems: 'center',
  ml: '$18',
  px: '$5',
  py: '$3',
  mb: '$1',
  borderRadius: '$lg',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'padding 0.2s ease-in-out',
  color: '$gray800',

  [`.${darkTheme} &`]: {
    color: '$white',
  },

  '@bp1': {
    py: '$5',
  },

  '@hover': {
    '&:hover': {
      pl: '$10',
    },
  },

  variants: {
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

export default PartitionItem;
