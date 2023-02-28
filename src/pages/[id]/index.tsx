import { darkTheme, styled } from '@/styles/stitches.config';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import Layout from '@/components/layout/Layout';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import ParticipationModal from '@/components/page/event/ParticipationModal';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/Timetable';
import { logOnBrowser } from 'common/utils/log';
import nookies from 'nookies';
import { updateParticipant } from '@/api/participants/update-participant';
import { useEventSWR } from '@/hooks/useEventSWR';
import { useParticipantSWR } from '@/hooks/useParticipantSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useRouter } from 'next/router';
import { useTimetable } from '@/hooks/useTimetable';

interface EventProps {
  eventID: string;
  participantCID: string;
}

function Event({ eventID, participantCID }: EventProps) {
  const router = useRouter();
  const [participantID, setParticipantID] = useState(participantCID ?? '');

  const { event } = useEventSWR({ eventID });
  const { participant } = useParticipantSWR({
    participantID: participantID ?? '',
  });
  const { participants } = useParticipantsSWR({ eventID });

  const { timetable, completeTimetable, handleTimetableChange } = useTimetable(event, participant);

  const isPossibleCreateParticipant = useMemo(() => {
    if (!participants || !event) return false;
    return participants.length < event.participantsNumber;
  }, [event, participants]);

  function handleParticipantIDChange(participantID: string) {
    setParticipantID(participantID);
  }

  const handleSubmitButtonClick = async () => {
    const availableIndexes: string[] = [];

    timetable.forEach((row, rowIndex) => {
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
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participant]);

  return (
    <Layout>
      <Page>
        <Paper>
          <Inner direction="column" gap={20}>
            <Flex align="center" justify="between" isFull>
              {participant && (
                <Flex gap={3} direction="column">
                  <Flex align="center" gap={2}>
                    <CalendarIcon size={36} />
                    <Text content={event?.title ?? ''} size="2xl" weight="bold" />
                  </Flex>
                  <Flex gap={2}>
                    <Text content={participant?.name ?? ''} weight="bold" />
                    <Text content="님의 시간표" />
                  </Flex>
                </Flex>
              )}
            </Flex>
            <Timetable
              startDate={event?.startDate ?? new Date()}
              endDate={event?.endDate ?? new Date()}
              startTime={event?.startTime ?? 0}
              endTime={event?.endTime ?? 0}
              timetable={timetable}
              handleTimetableChange={handleTimetableChange}
            />

            <ButtonWrapper justify="center" isFull>
              <Button radius="pill" size="2xl" color="primary" onClick={handleSubmitButtonClick}>
                <Text content="제출하기" color="white" size="2xl" weight="bold" />
              </Button>
            </ButtonWrapper>
          </Inner>
        </Paper>
      </Page>

      {event && (
        <ParticipationModal
          eventID={eventID}
          eventTitle={event.title}
          participantID={participantID}
          handleParticipantIDChange={handleParticipantIDChange}
          isPossibleCreateParticipant={isPossibleCreateParticipant}
        />
      )}
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

const Inner = styled(Flex, {
  minW: '$400',

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

const ButtonWrapper = styled(Flex, {
  py: '$20',
});

export default Event;
