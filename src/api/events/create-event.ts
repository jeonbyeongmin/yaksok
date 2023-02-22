import { Event } from 'common/inerfaces/Event.interface';

type CreateEventParams = Omit<Event, '_id'>;

interface CreateEventsReturn {
  success: boolean;
  data: Event;
}

export const CreateEventPath = () => '/api/events';

export const CreateEventAPI = async (
  event: CreateEventParams
): Promise<CreateEventsReturn> => {
  const response = await fetch(CreateEventPath(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  return response.json();
};
