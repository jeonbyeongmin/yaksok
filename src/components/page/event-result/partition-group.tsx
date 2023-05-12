import type { TimetablePartition } from '@/types/timetable.type';

import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';

import { PartitionItem } from '@/components/page/event-result/partition-item';
import { Box, Flex, Icon, Text } from '@/components/primitive';
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from '@/components/primitive/Collapsisble';
import { Panel, PanelInner } from '@/components/primitive/Panel';
import { darkTheme, styled } from '@/styles/stitches.config';

interface PartitionGroupProps {
  rank: number;
  partitionGroup: TimetablePartition[];
  selectedPartition: TimetablePartition | undefined;
  handleTimetablePartitionSelect: (partition: TimetablePartition) => void;
}

export function PartitionGroup({
  rank,
  partitionGroup,
  selectedPartition,
  handleTimetablePartitionSelect,
}: PartitionGroupProps) {
  const { t } = useTranslation('result-page');
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
    <Panel key={rank} align='start' direction='column' gap={5}>
      <PanelInner css={{ pb: '$5' }}>
        <Flex gap={4} isFull>
          <RankWrapper>
            <Text
              content={`${rank + 1}`}
              color='white'
              size='lg'
              weight='bold'
              css={{
                position: 'absolute',
                top: '1px',
              }}
            />
          </RankWrapper>
          <UnderLineBox>
            <Text
              content={`${partitionGroup[0].participantIDs.length} ${t('result.title')}`}
              size='sm'
              color={resolvedTheme === 'dark' ? 'white' : 'darken200'}
              weight='bold'
            />
          </UnderLineBox>
        </Flex>
        <CollapsibleRoot open={open} onOpenChange={setOpen}>
          <Items direction='column' isFull>
            {partitionGroupCollapseItems.topThreeitems.map((partition) => (
              <PartitionItem
                key={partition.id}
                partition={partition}
                selectedPartition={selectedPartition}
                handleTimetablePartitionSelect={handleTimetablePartitionSelect}
              />
            ))}
            <CollapsibleContent>
              {partitionGroupCollapseItems.remainItems.map((partition) => (
                <PartitionItem
                  key={partition.id}
                  partition={partition}
                  selectedPartition={selectedPartition}
                  handleTimetablePartitionSelect={handleTimetablePartitionSelect}
                />
              ))}
            </CollapsibleContent>
          </Items>

          {partitionGroupCollapseItems.remainItems.length > 0 && (
            <CollapsibleTrigger>
              <CollapsibleTriggerWrapper>
                <Icon name='caret-down' size={25} />
              </CollapsibleTriggerWrapper>
            </CollapsibleTrigger>
          )}
        </CollapsibleRoot>
      </PanelInner>
    </Panel>
  );
}

const Items = styled(Flex, {
  '&:last-child': { mb: '$10' },
});

const CollapsibleTriggerWrapper = styled(Flex, {
  w: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  pt: '$3',

  cursor: 'pointer',
  color: '$gray800',

  [`.${darkTheme} &`]: { color: '$white' },
});

const RankWrapper = styled(Flex, {
  'justifyContent': 'center',
  'position': 'relative',
  'alignItems': 'center',
  'w': '$13',
  'h': '$13',
  'bgColor': '$primary100',
  'borderRadius': '$pill',
  'flexShrink': 0,
  '@bp1': { w: '$15', h: '$15' },

  [`.${darkTheme} &`]: { bg: '$darken100' },
});

const UnderLineBox = styled(Box, {
  w: '$full',
  borderBottom: '1px solid $primary100',
  py: '$3',
  px: '$4',
  mb: '$3',
  [`.${darkTheme} &`]: { borderColor: '$white' },
});
