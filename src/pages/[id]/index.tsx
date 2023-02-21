import { useEffect, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import ParticipationModal from '@/components/ParticipationModal';
import { Text } from '@/components/primitive/Text';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import { logOnBrowser } from '@/utils/log';
import nookies from 'nookies';
import { styled } from '@/styles/stitches.config';
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
      <EventPageContainer justify="center">
        <EventPagePaper align="center" direction="column" gap={20}>
          <EventPageTop align="center" justify="between" isFull>
            <Flex align="center" gap={2}>
              <CalendarIcon size={36} />
              <Text content={event?.title ?? ''} size="2xl" weight="bold" />
            </Flex>

            <Button
              radius="pill"
              size="xl"
              color="primary"
              onClick={handleSubmitButtonClick}
            >
              <Text content="제출하기" color="white" size="xl" weight="bold" />
            </Button>
          </EventPageTop>
          <TimeTable
            startDate={event?.startDate ?? new Date()}
            endDate={event?.endDate ?? new Date()}
            startTime={event?.startTime ?? 0}
            endTime={event?.endTime ?? 0}
            timeTable={timeTable}
            handleTimeTableChange={handleTimeTableChange}
          />
        </EventPagePaper>
      </EventPageContainer>

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

const EventPageContainer = styled(Flex, {
  w: '$full',
  h: '$full',
  bg: '$linearLightBg200',
});

const EventPagePaper = styled(Flex, {
  w: '100%',
  bg: 'rgba(255, 255, 255, 0.6)',
  py: '$50',
  maxW: '$container',
});

const EventPageTop = styled(Flex, {
  maxW: '$350',
});

export default Event;
