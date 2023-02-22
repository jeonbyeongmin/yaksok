import { Participant } from 'common/inerfaces/Participant.interface';

type CreateParticipantParams = Omit<Participant, '_id'>;

interface CreateParticipantReturn {
  success: boolean;
  participant: Participant;
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
