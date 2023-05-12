import type { ReadEventReturn } from '@/api/events/read-event';

import useSWR from 'swr';

import { generateEventsPath } from '@/api/events/events-path';

export function useEventSWR({ eventId }: { eventId: string }) {
  const { data, isValidating } = useSWR<ReadEventReturn>(
    generateEventsPath({ resources: { eventId } }),
  );

  return {
    event: data?.event ?? emptyEvent,
    isLoading: isValidating,
  };
}

const emptyEvent = {
  _id: '',
  startDate: new Date(),
  endDate: new Date(),
  startTime: 0,
  endTime: 0,
  title: '',
};
