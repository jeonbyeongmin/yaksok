import { createPathGenerator } from 'common/utils/path';

export type EventResources = {
  eventId?: string;
};

export type EventQueries = {
  // Add query params here
};

export const EVENT_RESOURCE_NAME = 'events';

export const generateEventsPath = createPathGenerator<
  EventResources,
  EventQueries
>({
  resourceName: EVENT_RESOURCE_NAME,
  resourceIdKey: 'eventId',
});
