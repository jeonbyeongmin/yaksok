import {
  ReadParticipantParams,
  ReadParticipantPath,
  ReadParticipantReturn,
} from '@/api/participants/read-participant';

import useSWR from 'swr';

type UseParticipantParams = ReadParticipantParams & {};

export function useParticipantSWR({ participantID }: UseParticipantParams) {
  const { data, isValidating } = useSWR<ReadParticipantReturn>(
    participantID ? ReadParticipantPath({ participantID }) : null
  );

  return {
    participant: data?.participant,
    isLoading: isValidating,
  };
}
