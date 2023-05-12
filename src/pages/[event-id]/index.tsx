import type { Event } from 'common/interfaces/Event.interface';
import type { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nookies from 'nookies';
import { useMemo, useState } from 'react';

import { LoadingMessage } from '@/components/loading-message';
import { DraggableTimetable } from '@/components/page/event-detail/draggable-timetable';
import { EventTitle } from '@/components/page/event-detail/event-title';
import { ParticipationModal } from '@/components/page/event-detail/participation-modal';
import { ShareButton } from '@/components/page/event-detail/share-button';
import { SubmitButton } from '@/components/page/event-detail/submit-button';
import { Flex, Page, Paper } from '@/components/primitive';
import { useParticipantSWR } from '@/hooks/swr/use-participant-swr';
import { useDragSelectTable } from '@/hooks/use-drag-select-table';
import { getEventById } from '@/pages/api/events/[id]';
import { darkTheme, styled } from '@/styles/stitches.config';
import { convertNumberTableToBooleanTable, generateTimetable } from '@/utils/timetable';

interface EventProps {
  participantId?: string;
  event: Event;
}

export default function EventPage({ participantId: pid, event }: EventProps) {
  const [participantId, setParticipantId] = useState<string>(pid ?? '');

  const { participant, isLoading } = useParticipantSWR({ participantId });

  const initialTimetable = useMemo(() => {
    const timetable = generateTimetable({ event, participants: participant });
    return convertNumberTableToBooleanTable(timetable);
  }, [event, participant]);

  const [timetableRef, timetableValue] = useDragSelectTable(initialTimetable);

  return (
    <Page>
      <Paper>
        {isLoading ? <LoadingMessage /> : null}

        <Inner direction='column'>
          <Flex direction='column' isFull gap={3}>
            <Flex align='center' justify='end' isFull>
              <ShareButton />
            </Flex>
            <EventTitle title={event.title} participantName={participant?.name} />
          </Flex>
          <DraggableTimetable ref={timetableRef} event={event} value={timetableValue} />

          <SubmitButton
            timetableValue={timetableValue}
            participantId={participantId ?? ''}
          />
        </Inner>
      </Paper>

      {!participant && !isLoading ? (
        <ParticipationModal
          eventId={event._id}
          eventTitle={event.title}
          changeParticipantId={setParticipantId}
        />
      ) : null}
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const cookies = nookies.get(context);

  if (!params || !params['event-id']) {
    return {
      notFound: true,
    };
  }

  const eventId = params['event-id'];

  if (Array.isArray(eventId)) {
    throw new Error('eventId is array');
  }

  let participantId = null;

  if (cookies[`${eventId}-participantId`]) {
    participantId = cookies[`${eventId}-participantId`];
  }

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
      participantId,
      ...(await serverSideTranslations(context.locale ?? 'en', ['common', 'event-page'])),
    },
  };
};

const Inner = styled(Flex, {
  'color': '$gray800',

  'w': '$full',
  'px': '$5',
  'gap': '$12',

  '@bp2': {
    minW: '$300',
    maxW: '$300',
    gap: '$15',
  },
  '@bp3': {
    minW: '$400',
    maxW: '$400',
  },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});
