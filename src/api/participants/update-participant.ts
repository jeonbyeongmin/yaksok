import type {
  ParticipantQueries,
  ParticipantResources,
} from '@/api/participants/participants-path';
import type { Participant } from 'common/interfaces/participant.interface';

import { generateParticipantsPath } from '@/api/participants/participants-path';
import { fetcher } from '@/utils/fetcher';

type UpdateParticipantParams = ParticipantResources & {
  queries?: ParticipantQueries;
};

type UpdateParticipantBody = {
  availableIndexes: string[];
};

interface UpdateParticipantReturn {
  success: boolean;
  participant: Participant;
}

export const updateParticipantAPI = async (
  { participantId, queries }: UpdateParticipantParams,
  data: UpdateParticipantBody,
): Promise<UpdateParticipantReturn> => {
  return await fetcher(
    generateParticipantsPath({ resources: { participantId }, queries }),
    {
      method: 'PATCH',
      data,
    },
  );
};
