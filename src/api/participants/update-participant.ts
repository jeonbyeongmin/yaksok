import { Participant } from 'common/inerfaces/Participant.interface';

interface UpdateParticipantParams {
  participantID: string;
  availableIndexes: string[];
}

interface UpdateParticipantReturn {
  success: boolean;
  participant: Participant;
}

export const updateParticipant = async ({
  participantID,
  availableIndexes,
}: UpdateParticipantParams): Promise<UpdateParticipantReturn> => {
  const response = await fetch(`/api/participants/${participantID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ availableIndexes }),
  });

  return response.json();
};
