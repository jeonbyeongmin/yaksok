import useSWR from 'swr';

import { generateParticipantsPath } from '@/api/participants/participants-path';

import type {
  ReadParticipantsParams,
  ReadParticipantsReturn,
} from '@/api/participants/read-participants';

export function useParticipantsSWR({ queries }: ReadParticipantsParams) {
  const { data, mutate, isValidating } = useSWR<ReadParticipantsReturn>(
    generateParticipantsPath({ queries }),
  );

  const reload = () => mutate();

  return {
    reload,
    participants: data?.participants,
    isLoading: isValidating,
  };
}
