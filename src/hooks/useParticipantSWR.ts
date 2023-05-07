import useSWR from 'swr';

import { generateParticipantsPath } from '@/api/participants/participants-path';

import type {
  ReadParticipantParams,
  ReadParticipantReturn,
} from '@/api/participants/read-participant';

export function useParticipantSWR({ participantId }: ReadParticipantParams) {
  const { data, isValidating } = useSWR<ReadParticipantReturn>(
    participantId
      ? generateParticipantsPath({ resources: { participantId } })
      : null,
  );

  return {
    participant: data?.participant,
    isLoading: isValidating,
  };
}
