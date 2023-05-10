import { EventIdProvider } from '@/contexts/event-id-context';

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  return <EventIdProvider>{children}</EventIdProvider>;
};
