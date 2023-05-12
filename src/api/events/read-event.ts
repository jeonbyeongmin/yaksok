import type { EventQueries, EventResources } from '@/api/events/events-path';
import type { Event } from 'common/inerfaces/Event.interface';

import { generateEventsPath } from '@/api/events/events-path';
import { fetcher } from '@/utils/fetcher';

export type ReadEventParams = EventResources & {
  queries?: EventQueries;
};

export type ReadEventReturn = {
  event: Event;
};

export const readEventAPI = async ({
  eventId,
  queries,
}: ReadEventParams): Promise<ReadEventReturn> => {
  const path = generateEventsPath({ resources: { eventId }, queries });

  return await fetcher(path);
};
