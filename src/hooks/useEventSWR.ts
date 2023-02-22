import { ReadEventPath, ReadEventReturn } from '@/api/events/read-event';

import useSWR from 'swr';

interface UseEventParams {
  eventID: string;
}

export function useEventSWR({ eventID }: UseEventParams) {
  const { data, isValidating } = useSWR<ReadEventReturn>(
    eventID ? ReadEventPath({ eventID }) : null
  );

  return {
    event: data?.event,
    isLoading: isValidating,
  };
}
