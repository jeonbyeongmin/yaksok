import {
  ReadParticipantsParams,
  ReadParticipantsPath,
  ReadParticipantsReturn,
} from '@/api/participants/read-participants';

import useSWR from 'swr';

type UseParticipantParams = ReadParticipantsParams & {};

export function useParticipants({ eventID }: UseParticipantParams) {
  const { data, isValidating } = useSWR<ReadParticipantsReturn>(
    ReadParticipantsPath({ eventID })
  );

  return {
    participants: data?.participants,
    isLoading: isValidating,
  };
}
