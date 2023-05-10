import { useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

const EventIdContext = createContext<string | null>(null);

interface Props {
  children: React.ReactNode;
}

const EventIdProvider = ({ children }: Props) => {
  const router = useRouter();

  const queries = useMemo(() => router.query['board-id'], [router.query]);

  const eventId = useMemo(() => {
    return Array.isArray(queries) ? queries[0] : queries ?? '';
  }, [queries]);

  return <EventIdContext.Provider value={eventId}>{children}</EventIdContext.Provider>;
};

const useEventId = () => {
  const eventId = useContext(EventIdContext);
  if (eventId === null) {
    throw new Error('useEventId must be used within a EventIdProvider');
  }
  return eventId;
};

export { EventIdProvider, useEventId };
