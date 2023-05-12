import type { TimetablePartition } from '@/types/timetable.type';

import { useCallback, useState } from 'react';

import { EventResultCalendarPanelButtons } from '@/components/page/event-result/event-result-calendar-panel-buttons';
import { ResultTimetable } from '@/components/page/event-result/result-timetable';
import { Badge, Flex, Icon, Text } from '@/components/primitive';
import { Panel, PanelInner } from '@/components/primitive/Panel';
import { useEvent } from '@/contexts/event-context';
import { useParticipants } from '@/contexts/participants-context';
import { generateTimetable } from '@/utils/timetable';

interface Props {
  timetable: number[][];
  selectedPartition?: TimetablePartition;
  handleTimetableChange: (timetable: number[][]) => void;
}

export function EventResultCalendarPanel({
  timetable,
  handleTimetableChange,
  selectedPartition,
}: Props) {
  const { event } = useEvent();
  const { participants } = useParticipants();

  const [selectedParticipant, setSelectedParticipant] = useState<string[]>(
    participants.map((participant) => participant._id),
  );

  const isSelected = useCallback(
    (participantId: string) => {
      return selectedParticipant.includes(participantId);
    },
    [selectedParticipant],
  );

  const handleParticipantSelect = useCallback(
    (participantId: string) => {
      const newSelectedParticipant = isSelected(participantId)
        ? selectedParticipant.filter((id) => id !== participantId)
        : [...selectedParticipant, participantId];

      const newSelectedParticipants = participants.filter((participant) =>
        newSelectedParticipant.includes(participant._id),
      );

      const newTimetable = generateTimetable({
        event,
        participants: newSelectedParticipants,
      });
      handleTimetableChange(newTimetable);
      setSelectedParticipant(newSelectedParticipant);
    },
    [event, handleTimetableChange, isSelected, participants, selectedParticipant],
  );

  return (
    <Panel direction='column'>
      <PanelInner align='start' gap={5}>
        <EventResultCalendarPanelButtons />
        <Flex align='center' gap={3} css={{ pb: '1rem' }}>
          <Icon name='calendar' size={20} />
          <Text content={event?.title ?? ''} size='lg' weight='bold' />
        </Flex>
        <Flex isFull gap={7}>
          <ResultTimetable
            participantsLength={participants.length}
            timetable={timetable}
            selectedPartition={selectedPartition}
          />
          <Flex direction='column' gap={5}>
            {participants?.map((participant) => (
              <Badge
                key={participant._id}
                size='sm'
                active={isSelected(participant._id)}
                onClick={() => handleParticipantSelect(participant._id)}
                content={participant.name}
              />
            ))}
          </Flex>
        </Flex>
      </PanelInner>
    </Panel>
  );
}
