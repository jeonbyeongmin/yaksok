import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import { useEvent } from '@/hooks/useEvent';
import { useParticipants } from '@/hooks/useParticipants';

interface EventResultProps {
  eventID: string;
}

function EventResult({ eventID }: EventResultProps) {
  const { event } = useEvent({ eventID });
  const { participants } = useParticipants({ eventID });

  const [timeTable, setTimeTable] = useState<number[][]>([]);

  useEffect(() => {
    if (!event || !participants) return;

    const { startDate, endDate, startTime, endTime } = event;
    const newTimeTable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0)
    );

    participants.forEach((participant) => {
      participant.availableIndexes.forEach((index) => {
        const [rowIndex, colIndex] = index.split('-');
        newTimeTable[Number(rowIndex)][Number(colIndex)] += 1;
      });
    });

    setTimeTable(newTimeTable);
  }, [event, participants]);

  return (
    <Layout>
      <TimeTable
        startDate={event?.startDate ?? new Date()}
        endDate={event?.endDate ?? new Date()}
        startTime={event?.startTime ?? 0}
        endTime={event?.endTime ?? 0}
        timeTable={timeTable}
        participantsNumber={participants?.length}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  return {
    props: {
      eventID: id,
    },
  };
};

export default EventResult;
