import { Event } from 'common/inerfaces/Event.interface';

interface GetEventParams {
  path: string;
}

export interface GetEventReturn {
  success: boolean;
  event: Event;
}

export const getEventPath = ({ eventID }: { eventID: string }) => `/api/events/${eventID}`;

export const getEventAPI = async ({ path }: GetEventParams): Promise<GetEventReturn> => {
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
