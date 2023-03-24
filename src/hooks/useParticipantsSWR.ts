import {
  GetParticipantsParams,
  getParticipantsPath,
  GetParticipantsReturn,
} from '@/api/participants/read-participants';

import useSWR from 'swr';

type UseParticipantParams = GetParticipantsParams & {};

export function useParticipantsSWR({ eventID }: UseParticipantParams) {
  const { data, mutate, isValidating } = useSWR<GetParticipantsReturn>(
    getParticipantsPath({ eventID })
  );

  const reload = () => mutate();

  return {
    reload,
    participants: data?.participants,
    isLoading: isValidating,
  };
}
