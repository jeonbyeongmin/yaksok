import { darkTheme, styled } from '@/styles/stitches.config';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import Layout from '@/components/layout/Layout';
import LoadingMessage from '@/components/page/LoadingMessage';
import { Overlay } from '@/components/primitive/Overlay';
import { Page } from '@/components/primitive/Page';
import { Paper } from '@/components/primitive/Paper';
import ParticipationModal from '@/components/page/event/ParticipationModal';
import { ShareIcon } from '@/components/assets';
import { Text } from '@/components/primitive/Text';
import Timetable from '@/components/page/Timetable';
import { logOnBrowser } from 'common/utils/log';
import { makeToast } from '@/components/primitive/Toast';
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleParticipantIDChange = (participantID: string) => {
    setParticipantID(participantID);
  };

  const getAvailableIndexes = useCallback(() => {
    const availableIndexes: string[] = [];
    timetable.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col) {
          const index = `${rowIndex}-${colIndex}`;
          availableIndexes.push(index);
        }
      });
    });
    return availableIndexes;
  }, [timetable]);

  const handleShareButtonClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      makeToast({
        type: 'success',
        title: '초대 링크를 클립보드에 복사했어요',
        message: '친구들에게 공유해보세요!',
      });
    } catch (error) {}
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    const availableIndexes = getAvailableIndexes();

    try {
      setIsLoading(true);

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

    setIsLoading(false);
  }, [eventID, getAvailableIndexes, participantID, router]);

  useEffect(() => {
    if (participantCID) setParticipantID(participantCID);
  }, [participantCID]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participant]);

  if (!event || !participant) {
    return (
      <Layout>
        <Page>
          <Paper>
            <LoadingMessage />
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

  return (
    <Layout>
      <Page>
        <Paper>
          <Inner direction="column" gap={20}>
            <Flex align="center" justify="between" isFull>
              <Flex gap={3} direction="column">
                <Flex align="center" gap={2}>
                  <CalendarIcon size={36} />
                  <Text content={event?.title ?? ''} size="2xl" weight="bold" />
                </Flex>
                {participant && (
                  <Flex gap={2}>
                    <Text content={participant?.name ?? ''} weight="bold" />
                    <Text content="님의 시간표" />
                  </Flex>
                )}
              </Flex>
              <ShareButton
                onClick={handleShareButtonClick}
                color="light"
                leftElement={<ShareIcon size={18} />}
                radius="pill"
                size="sm"
                shadow
                noBlank>
                <Text content="공유하기" size="sm" />
              </ShareButton>
            </Flex>
            <Timetable
              startDate={event.startDate}
              endDate={event.endDate}
              startTime={event.startTime}
              endTime={event.endTime}
              timetable={timetable}
              handleTimetableChange={handleTimetableChange}
            />

            <ButtonWrapper justify="center" isFull>
              <Button
                radius="pill"
                size="2xl"
                color="primary"
                onClick={handleSubmitButtonClick}
                isLoading={isLoading}>
                <Text content="제출하기" color="white" size="2xl" weight="bold" />
              </Button>
            </ButtonWrapper>
          </Inner>
        </Paper>
      </Page>
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

const ShareButton = styled(Button, {
  color: '$gray300',

  [`.${darkTheme} &`]: {
    color: '$gray400',
  },
});

const ButtonWrapper = styled(Flex, {
  py: '$20',
});

export default Event;
