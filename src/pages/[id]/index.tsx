import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BsCalendarEvent } from 'react-icons/bs';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import ParticipationModal from '@/components/ParticipationModal';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import { logOnBrowser } from '@/utils/log';
import nookies from 'nookies';
import { updateParticipant } from '@/api/participants/update-participant';
import { useEvent } from '@/hooks/useEvent';
import { useParticipant } from '@/hooks/useParticipant';
import { useRouter } from 'next/router';

interface EventProps {
  eventID: string;
  participantCID: string;
}

function Event({ eventID, participantCID }: EventProps) {
  const router = useRouter();

  const [timeTable, setTimeTable] = useState<number[][]>([]);
  const [participantID, setParticipantID] = useState<string>(
    participantCID ?? ''
  );

  const { event } = useEvent({ eventID });
  const { participant } = useParticipant({
    participantID: participantID ?? '',
  });

  const handleParticipantIDChange = (participantID: string) => {
    setParticipantID(participantID);
  };

  const handleTimeTableChange = (timeTable: number[][]) => {
    setTimeTable(timeTable);
  };

  const handleSubmitButtonClick = async () => {
    const availableIndexes: string[] = [];

    timeTable.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col) {
          const index = `${rowIndex}-${colIndex}`;
          availableIndexes.push(index);
        }
      });
    });

    try {
      const { success } = await updateParticipant({
        participantID,
        availableIndexes,
      });

      if (success) {
        router.push(`/${eventID}/result`);
      }
    } catch (error) {
      logOnBrowser(error);
    }
  };

  useEffect(() => {
    if (participantCID) setParticipantID(participantCID);
  }, [participantCID]);

  useEffect(() => {
    if (!event) return;

    const { startDate, endDate, startTime, endTime } = event;
    const newTimeTable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0)
    );

    if (participant && participant.availableIndexes) {
      participant?.availableIndexes.forEach((index) => {
        const [row, col] = index.split('-').map((v) => Number(v));
        newTimeTable[row][col] = 1;
      });
    }

    setTimeTable(newTimeTable);
  }, [event, participant]);

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
              onClick={handleSubmitButtonClick}
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
        handleParticipantIDChange={handleParticipantIDChange}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  let participantCID = null;
  const cookies = nookies.get(ctx);

  if (cookies[`${id}-participantID`]) {
    participantCID = cookies[`${id}-participantID`];
  }

  return {
    props: {
      eventID: id,
      participantCID,
    },
  };
};

export default Event;
