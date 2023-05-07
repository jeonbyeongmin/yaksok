import type {
  ParticipantQueries,
  ParticipantResources,
} from '@/api/participants/participants-path';
import type { Participant } from 'common/inerfaces/Participant.interface';

import { generateParticipantsPath } from '@/api/participants/participants-path';
import { fetcher } from '@/utils/fetcher';

export type ReadParticipantsParams = ParticipantResources & {
  queries?: ParticipantQueries;
};

export interface ReadParticipantsReturn {
  participants: Participant[];
}

export const readParticipantsAPI = async ({
  queries,
}: ReadParticipantsParams): Promise<ReadParticipantsReturn> => {
  return await fetcher(generateParticipantsPath({ queries }));
};
