import type { Participant } from 'common/inerfaces/Participant.interface';
import type { ReadParticipantsReturn } from '@/api/participants/read-participants';

import { createContext, useContext, useMemo } from 'react';

import { useParticipantsSWR } from '@/hooks/swr/use-participants-swr';

type ParticipantsContextType = {
  participants: Participant[];
  isLoading: boolean;
};

type ParticipantsDispatchContextType = {
  reload: () => Promise<ReadParticipantsReturn | undefined>;
};

const ParticipantsContext = createContext<ParticipantsContextType | null>(null);
const ParticipantsDispatchContext = createContext<ParticipantsDispatchContextType | null>(
  null,
);

interface Props {
  children: React.ReactNode;
  eventId: string;
}

function ParticipantsProvider({ children, eventId }: Props) {
  const { participants, reload, isLoading } = useParticipantsSWR({
    queries: { eventId },
  });

  const participantsContextValue = useMemo(() => {
    return {
      participants: participants ?? [],
      isLoading: isLoading,
    };
  }, [participants, isLoading]);

  const participantsDispatchContextValue = useMemo(() => {
    return {
      reload: reload,
    };
  }, [reload]);

  return (
    <ParticipantsContext.Provider value={participantsContextValue}>
      <ParticipantsDispatchContext.Provider value={participantsDispatchContextValue}>
        {children}
      </ParticipantsDispatchContext.Provider>
    </ParticipantsContext.Provider>
  );
}

function useParticipants() {
  const context = useContext(ParticipantsContext);
  if (context === null) {
    throw new Error('useParticipants must be used within a ParticipantsProvider');
  }
  return context;
}

function useParticipantsDispatch() {
  const context = useContext(ParticipantsDispatchContext);
  if (context === null) {
    throw new Error('useParticipantsDispatch must be used within a ParticipantsProvider');
  }
  return context;
}

export { ParticipantsProvider, useParticipants, useParticipantsDispatch };
