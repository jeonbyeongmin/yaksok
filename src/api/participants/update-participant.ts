import {
  ParticipantQueries,
  ParticipantResources,
  generateParticipantsPath,
} from '@/api/participants/participants-path';

import type { Participant } from 'common/inerfaces/Participant.interface';
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
