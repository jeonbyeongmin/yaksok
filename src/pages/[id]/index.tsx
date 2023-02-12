import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BsCalendarEvent } from 'react-icons/bs';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import ParticipationModal from '@/components/ParticipationModal';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import nookies from 'nookies';
import { useEvent } from '@/hooks/useEvent';
import { useParticipant } from '@/hooks/useParticipant';

interface EventProps {
  eventID: string;
  participantID: string;
}

function Event({ eventID, participantID }: EventProps) {
  const { event } = useEvent({ eventID });
  const { participant } = useParticipant({
    participantID: participantID ?? '',
  });

  const [timeTable, setTimeTable] = useState<boolean[][]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTimeTableChange = (timeTable: boolean[][]) => {
    setTimeTable(timeTable);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!event) return;

    const { startDate, endDate, startTime, endTime } = event;
    const newTimeTable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(false)
    );

    setTimeTable(newTimeTable);
  }, [event]);

  return (
    <Layout>
      <Flex w="full" py={20} align="center" justify="center">
        <Flex w="50rem" alignItems="center" flexDirection="column" gap={10}>
          <Flex w="full" align="center" justify="space-between">
            <Flex alignItems="center" gap={2}>
              <BsCalendarEvent size={24} />
              <Text fontSize="2xl">{event?.title}</Text>
            </Flex>

            <Button
              borderRadius="full"
              size="md"
              bgColor="primary"
              color="white"
            >
              완료
            </Button>
          </Flex>
          <TimeTable
            startDate={event?.startDate ?? new Date()}
            endDate={event?.endDate ?? new Date()}
            startTime={event?.startTime ?? 0}
            endTime={event?.endTime ?? 0}
            timeTable={timeTable}
            handleTimeTableChange={handleTimeTableChange}
          />
        </Flex>
      </Flex>

      <ParticipationModal
        eventID={eventID}
        eventTitle={event?.title ?? ''}
        participantID={participantID}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  let participantID = null;
  const cookies = nookies.get(ctx);

  if (cookies[`${id}-participantID`]) {
    participantID = cookies[`${id}-participantID`];
  }

  return {
    props: {
      eventID: id,
      participantID,
    },
  };
};

export default Event;
