import type { Participant } from 'common/inerfaces/Participant.interface';
import type { ParticipantQueries } from '@/api/participants/participants-path';
import { fetcher } from '@/utils/fetcher';
import { generateParticipantsPath } from '@/api/participants/participants-path';

type CreateParticipantParams = {
  queries?: ParticipantQueries;
};
type CreateParticipantBody = Omit<Participant, '_id'>;

interface CreateParticipantReturn {
  participant: Participant;
}

export const CreateParticipantAPI = async (
  { queries }: CreateParticipantParams,
  data: CreateParticipantBody,
): Promise<CreateParticipantReturn> => {
  return await fetcher(generateParticipantsPath({ queries }), {
    method: 'POST',
    data,
  });
};
