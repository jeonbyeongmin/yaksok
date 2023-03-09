import { Participant } from 'common/inerfaces/Participant.interface';

export interface ReadParticipantParams {
  participantID: string;
}

export interface ReadParticipantReturn {
  success: boolean;
  participant: Participant;
}

export const ReadParticipantPath = ({ participantID }: ReadParticipantParams) => {
  return `/api/participants/${participantID}`;
};

export const ReadParticipantAPI = async ({
  participantID,
}: ReadParticipantParams): Promise<ReadParticipantReturn> => {
  const response = await fetch(ReadParticipantPath({ participantID }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
