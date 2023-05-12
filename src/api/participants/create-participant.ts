import type { Participant } from 'common/inerfaces/participant.interface';
import type { ParticipantQueries } from '@/api/participants/participants-path';

import { generateParticipantsPath } from '@/api/participants/participants-path';
import { fetcher } from '@/utils/fetcher';

type CreateParticipantParams = {
  queries?: ParticipantQueries;
};
type CreateParticipantBody = Omit<Participant, '_id'>;

interface CreateParticipantReturn {
  participant: Participant;
}

export const createParticipantAPI = async (
  { queries }: CreateParticipantParams,
  data: CreateParticipantBody,
): Promise<CreateParticipantReturn> => {
  return await fetcher(generateParticipantsPath({ queries }), {
    method: 'POST',
    data,
  });
};
