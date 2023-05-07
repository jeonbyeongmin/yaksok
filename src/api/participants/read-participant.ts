import type {
  ParticipantQueries,
  ParticipantResources,
} from '@/api/participants/participants-path';

import { Participant } from 'common/inerfaces/Participant.interface';
import { fetcher } from '@/utils/fetcher';
import { generateParticipantsPath } from '@/api/participants/participants-path';

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
