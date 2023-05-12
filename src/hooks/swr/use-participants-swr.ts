import useSWR from 'swr';

import { generateParticipantsPath } from '@/api/participants/participants-path';

import type {
  ReadParticipantsParams,
  ReadParticipantsReturn,
} from '@/api/participants/read-participants';

export function useParticipantsSWR(
  { queries }: ReadParticipantsParams,
  possibleCondition = true,
) {
  const { data, mutate, isValidating } = useSWR<ReadParticipantsReturn>(
    possibleCondition && generateParticipantsPath({ queries }),
  );

  const reload = () => mutate();

  return {
    reload,
    participants: data?.participants,
    isLoading: isValidating,
  };
}
