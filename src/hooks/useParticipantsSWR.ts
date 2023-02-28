import {
  ReadParticipantsParams,
  ReadParticipantsPath,
  ReadParticipantsReturn,
} from '@/api/participants/read-participants';

import useSWR from 'swr';

type UseParticipantParams = ReadParticipantsParams & {};

export function useParticipantsSWR({ eventID }: UseParticipantParams) {
  const { data, mutate, isValidating } = useSWR<ReadParticipantsReturn>(
    ReadParticipantsPath({ eventID })
  );

  const reload = () => mutate();

  return {
    reload,
    participants: data?.participants,
    isLoading: isValidating,
  };
}
