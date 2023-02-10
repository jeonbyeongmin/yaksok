import { Participant } from 'server/inerfaces/Participant.interface';

type CreateParticipantParams = Participant;

interface CreateParticipantReturn {
  success: boolean;
  data: Participant;
}

export const CreateParticipantPath = () => '/api/participants';

export const CreateParticipantAPI = async (
  participant: CreateParticipantParams
): Promise<CreateParticipantReturn> => {
  const response = await fetch(CreateParticipantPath(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(participant),
  });

  return response.json();
};
