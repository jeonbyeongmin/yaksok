import { Event } from 'server/inerfaces/Event.interface';

interface ReadEventParams {
  eventID: string;
}

type ReadEventData = Event & { _id: string };

export interface ReadEventReturn {
  success: boolean;
  event: ReadEventData;
}

export const ReadEventPath = ({ eventID }: ReadEventParams) =>
  `/api/events/${eventID}`;

export const ReadEventAPI = async ({
  eventID,
}: ReadEventParams): Promise<ReadEventReturn> => {
  const response = await fetch(ReadEventPath({ eventID }));
  return response.json();
};
