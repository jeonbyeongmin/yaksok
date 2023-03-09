import { GetEventReturn, getEventPath } from '@/api/events/read-event';

import useSWR from 'swr';

interface UseEventParams {
  eventID: string;
}

export function useEventSWR({ eventID }: UseEventParams) {
  const { data, isValidating } = useSWR<GetEventReturn>(eventID ? getEventPath({ eventID }) : null);

  return {
    event: data?.event,
    isLoading: isValidating,
  };
}
