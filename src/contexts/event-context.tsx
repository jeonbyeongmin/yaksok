import type { Event } from 'common/inerfaces/Event.interface';

import { createContext, useContext, useMemo } from 'react';

import { useEventSWR } from '@/hooks/swr/use-event-swr';

type EventContextType = {
  event: Event;
  isLoading: boolean;
};

const EventContext = createContext<EventContextType | null>(null);

interface Props {
  children: React.ReactNode;
  eventId: string;
}

export function EventProvider({ children, eventId }: Props) {
  const { event, isLoading } = useEventSWR({ eventId });

  const eventContextValue = useMemo(() => {
    return {
      event: event,
      isLoading: isLoading,
    };
  }, [event, isLoading]);

  return (
    <EventContext.Provider value={eventContextValue}>{children}</EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (context === null) {
    throw new Error('useEvent must be used within a EventProvider');
  }
  return context;
}
