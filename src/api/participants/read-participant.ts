import type {
  ParticipantQueries,
  ParticipantResources,
} from '@/api/participants/participants-path';
import type { Participant } from 'common/inerfaces/participant.interface';

import { generateParticipantsPath } from '@/api/participants/participants-path';
import { fetcher } from '@/utils/fetcher';

export type ReadParticipantParams = ParticipantResources & {
  queries?: ParticipantQueries;
};

export interface ReadParticipantReturn {
  participant: Participant;
}

export const readParticipantAPI = async ({
  participantId,
  queries,
}: ReadParticipantParams): Promise<ReadParticipantReturn> => {
  return await fetcher(
    generateParticipantsPath({ resources: { participantId }, queries }),
  );
};
