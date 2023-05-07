import { Event } from 'common/inerfaces/Event.interface';

import { generateEventsPath } from '@/api/events/events-path';
import { fetcher } from '@/utils/fetcher';

import type { EventQueries, EventResources } from '@/api/events/events-path';

type ReadEventParams = EventResources & {
  queries?: EventQueries;
};

export const readEventAPI = async ({
  eventId,
  queries,
}: ReadEventParams): Promise<Event> => {
  const path = generateEventsPath({ resources: { eventId }, queries });

  return await fetcher(path);
};
