import { Participant } from 'common/inerfaces/Participant.interface';

export interface GetParticipantsParams {
  eventID?: string;
}

export interface GetParticipantsReturn {
  success: boolean;
  participants: Participant[];
}

export const getParticipantsPath = ({ eventID }: GetParticipantsParams) => {
  return `/api/participants/?eventID=${eventID ?? ''}`;
};

export const getParticipantsAPI = async ({
  eventID,
}: GetParticipantsParams): Promise<GetParticipantsReturn> => {
  const response = await fetch(getParticipantsPath({ eventID }));
  return response.json();
};
