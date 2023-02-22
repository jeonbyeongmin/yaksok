import { Participant } from 'common/inerfaces/Participant.interface';

export interface ReadParticipantsParams {
  eventID?: string;
}

export interface ReadParticipantsReturn {
  success: boolean;
  participants: Participant[];
}

export const ReadParticipantsPath = ({ eventID }: ReadParticipantsParams) => {
  return `/api/participants/?eventID=${eventID ?? ''}`;
};

export const ReadParticipantsAPI = async ({
  eventID,
}: ReadParticipantsParams): Promise<ReadParticipantsReturn> => {
  const response = await fetch(ReadParticipantsPath({ eventID }));
  return response.json();
};
