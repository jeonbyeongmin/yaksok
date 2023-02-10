import { Event } from 'server/inerfaces/Event.interface';

type CreateEventParams = Event;

interface CreateEventsReturn {
  success: boolean;
  data: Event & { _id: string };
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
