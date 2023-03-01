import { CollapsibleRoot, CollapsibleTrigger } from '@/components/primitive/Collapsisble';
import { darkTheme, styled } from '@/styles/stitches.config';
import { useMemo, useState } from 'react';

import { Box } from '@/components/primitive/Box';
import { Card } from '@/components/primitive/Card';
import { CaretDownIcon } from '@/components/assets/CaretDownIcon';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import { Event } from 'common/inerfaces/Event.interface';
import { Flex } from '@/components/primitive/Flex';
import PartitionItem from '@/components/page/event-result/PartitionItem';
import { Text } from '@/components/primitive/Text';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import { useTheme } from 'next-themes';

interface PartitionGroupProps {
  rank: number;
  partitionGroup: TimetablePartition[];
  event: Event;
  selectedTimetablePartition: TimetablePartition | undefined;
  handleTimetablePartitionSelect: (partition: TimetablePartition) => void;
}

function PartitionGroup({
  rank,
  partitionGroup,
  event,
  selectedTimetablePartition,
  handleTimetablePartitionSelect,
}: PartitionGroupProps) {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const partitionGroupCollapseItems = useMemo(() => {
    const topThreeitems = [];
    const remainItems = [];

    for (let i = 0; i < Math.min(3, partitionGroup.length); i++) {
      topThreeitems.push(partitionGroup[i]);
    }
    for (let i = 3; i < partitionGroup.length; i++) {
      remainItems.push(partitionGroup[i]);
    }

    return { topThreeitems, remainItems };
  }, [partitionGroup]);

  return (
    <Card key={rank} align="start" direction="column" gap={5}>
      <CardInner>
        <Flex gap={4} isFull>
          <RankWrapper>
            <Text content={`${rank + 1}`} color="white" size="lg" weight="bold" />
          </RankWrapper>
          <UnderLineBox>
            <Text
              content={
                partitionGroup[0].participantIDs.length === event.participantsNumber
                  ? '모든 참여자가 약속했어요'
                  : `${partitionGroup[0].participantIDs.length}명의 참여자가 약속했어요`
              }
              size="sm"
              color={resolvedTheme === 'dark' ? 'white' : 'darken200'}
              weight="bold"
            />
          </UnderLineBox>
        </Flex>
        <CollapsibleRoot open={open} onOpenChange={setOpen}>
          <Items direction="column" isFull>
            {partitionGroupCollapseItems.topThreeitems.map((partition) => (
              <PartitionItem
                key={partition.id}
                partition={partition}
                event={event}
                selectedTimetablePartition={selectedTimetablePartition}
                handleTimetablePartitionSelect={handleTimetablePartitionSelect}
              />
            ))}
            <CollapsibleContent>
              {partitionGroupCollapseItems.remainItems.map((partition) => (
                <PartitionItem
                  key={partition.id}
                  partition={partition}
                  event={event}
                  selectedTimetablePartition={selectedTimetablePartition}
                  handleTimetablePartitionSelect={handleTimetablePartitionSelect}
                />
              ))}
            </CollapsibleContent>
          </Items>

          {partitionGroupCollapseItems.remainItems.length > 0 && (
            <CollapsibleTrigger>
              <CollapsibleTriggerWrapper>
                <CaretDownIcon size={25} />
              </CollapsibleTriggerWrapper>
            </CollapsibleTrigger>
          )}
        </CollapsibleRoot>
      </CardInner>
    </Card>
  );
}

const Items = styled(Flex, {
  '&:last-child': { mb: '$10' },
});

const CardInner = styled(Flex, {
  flexDirection: 'column',
  w: '$full',
  px: '$15',
  pt: '$15',
});

const CollapsibleTriggerWrapper = styled(Flex, {
  w: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  py: '$3',
  px: '$4',
  cursor: 'pointer',
  color: '$black',

  [`.${darkTheme} &`]: { color: '$white' },
});

const RankWrapper = styled(Flex, {
  justifyContent: 'center',
  alignItems: 'center',
  w: '$15',
  h: '$15',
  bgColor: '$primary',
  borderRadius: '$round',
  flexShrink: 0,
  [`.${darkTheme} &`]: { bg: '$darken100' },
});

const UnderLineBox = styled(Box, {
  w: '$full',
  borderBottom: '1px solid $primary',
  py: '$3',
  px: '$4',
  mb: '$3',
  [`.${darkTheme} &`]: { borderColor: '$white' },
});

export default PartitionGroup;