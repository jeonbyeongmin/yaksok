import type { Event } from 'common/inerfaces/Event.interface';
import type { EventQueries } from '@/api/events/events-path';
import { fetcher } from '@/utils/fetcher';
import { generateEventsPath } from '@/api/events/events-path';

type CreateEventParams = {
  queries?: EventQueries;
};

type CreateEventBody = Omit<Event, '_id'>;

interface CreateEventsReturn {
  event: Event;
}

export const createEventAPI = async (
  { queries }: CreateEventParams,
  data: CreateEventBody,
): Promise<CreateEventsReturn> => {
  return await fetcher(generateEventsPath({ queries }), {
    method: 'POST',
    data,
  });
};
