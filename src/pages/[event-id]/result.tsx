import type { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EventResultContent } from '@/components/page/event-result/event-result-content';
import { EventResultHead } from '@/components/page/event-result/event-result-head';
import { Page, Paper } from '@/components/primitive';
import { EventProvider } from '@/contexts/event-context';
import { ParticipantsProvider } from '@/contexts/participants-context';
import { getEventById } from '@/pages/api/events/[id]';

interface Props {
  eventId: string;
}

export default function EventResult({ eventId }: Props) {
  return (
    <EventProvider eventId={eventId}>
      <ParticipantsProvider eventId={eventId}>
        <Page>
          <Paper transparent>
            <EventResultHead />
            <EventResultContent />
          </Paper>
        </Page>
      </ParticipantsProvider>
    </EventProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params || !params['event-id']) {
    return {
      notFound: true,
    };
  }

  const eventId = params['event-id'];

  if (Array.isArray(eventId)) {
    throw new Error('eventId is array');
  }

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      eventId,
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
        'result-page',
      ])),
    },
  };
};
