import { Event } from 'common/inerfaces/Event.interface';

interface ReadEventParams {
  eventID: string;
}

export interface ReadEventReturn {
  success: boolean;
  event: Event;
}

export const ReadEventPath = ({ eventID }: ReadEventParams) =>
  `/api/events/${eventID}`;

export const ReadEventAPI = async ({
  eventID,
}: ReadEventParams): Promise<ReadEventReturn> => {
  const response = await fetch(ReadEventPath({ eventID }));
  return response.json();
};
