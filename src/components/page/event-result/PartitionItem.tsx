import { convertIndexToDate, convertIndexToTime } from 'common/utils/convert';
import { darkTheme, styled } from '@/styles/stitches.config';

import { Event } from 'common/inerfaces/Event.interface';
import { Flex } from '@/components/primitive/Flex';
import { Text } from '@/components/primitive/Text';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { useTheme } from 'next-themes';

interface PartitionItemProps {
  partition: TimetablePartition;
  event: Event;
  selectedTimetablePartition: TimetablePartition | undefined;
  handleTimetablePartitionSelect: (partition: TimetablePartition) => void;
}

function PartitionItem({
  partition,
  event,
  selectedTimetablePartition,
  handleTimetablePartitionSelect,
}: PartitionItemProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ListItem
      gap={5}
      selected={selectedTimetablePartition?.id === partition.id ? true : false}
      onClick={() => handleTimetablePartitionSelect(partition)}>
      <Text
        content={`${convertIndexToDate(partition.col, event.startDate)}`}
        color="primary"
        weight="bold"
      />
      <Text
        content={`${convertIndexToTime(
          partition.startRow,
          event.startTime ?? 0
        )} 부터 ${convertIndexToTime(partition.endRow + 1, event.startTime)} 까지`}
        color={resolvedTheme === 'dark' ? 'white' : 'black'}
      />
    </ListItem>
  );
}

const ListItem = styled(Flex, {
  alignItems: 'center',
  ml: '$18',
  p: '$8',
  borderRadius: '$md',
  cursor: 'pointer',
  userSelect: 'none',
  '@hover': {
    '&:hover': {
      bg: '$lighten300',
      [`.${darkTheme} &`]: { bg: '$darken200' },
    },
  },

  variants: {
    selected: {
      true: { bg: '$lighten300', [`.${darkTheme} &`]: { bg: '$darken200' } },
      false: { bg: 'transparent' },
    },
  },
});

export default PartitionItem;
