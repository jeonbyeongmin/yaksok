import { Participant } from 'server/inerfaces/Participant.interface';

export interface ReadParticipantParams {
  participantID: string;
}

type ReadParticipantData = Participant & { _id: string };

export interface ReadParticipantReturn {
  success: boolean;
  participant: ReadParticipantData;
}

export const ReadParticipantPath = ({
  participantID,
}: ReadParticipantParams) => {
  return `/api/participants/${participantID}`;
};

export const ReadParticipantAPI = async ({
  participantID,
}: ReadParticipantParams): Promise<ReadParticipantReturn> => {
  const response = await fetch(ReadParticipantPath({ participantID }));
  return response.json();
};
