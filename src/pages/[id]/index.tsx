import { darkTheme, styled } from '@/styles/stitches.config';
import { getEventAPI, getEventPath } from '@/api/events/read-event';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout/Layout';
import LoadingMessage from '@/components/page/LoadingMessage';
import ParticipationModal from '@/components/page/event/ParticipationModal';
import Timetable from '@/components/page/Timetable';
import { logOnBrowser } from 'common/utils/log';
import { makeToast } from '@/components/primitive/Toast';
import nookies from 'nookies';
import { updateParticipant } from '@/api/participants/update-participant';
import { useParticipantSWR } from '@/hooks/useParticipantSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useRouter } from 'next/router';
import { useTimetable } from '@/hooks/useTimetable';
import { Event } from 'common/inerfaces/Event.interface';
import { Button, Flex, Icon, Page, Paper, Text } from '@/components/primitive';

interface EventProps {
  eventID: string;
  participantCID: string;
  event: Event;
}

function Event({ eventID, participantCID, event }: EventProps) {
  const router = useRouter();

  const [participantID, setParticipantID] = useState(participantCID ?? '');
  const [isLoading, setIsLoading] = useState(false);

  const { participant } = useParticipantSWR({
    participantID: participantID ?? '',
  });
  const { participants } = useParticipantsSWR({ eventID });
  const { timetable, completeTimetable, handleTimetableChange } = useTimetable(event, participant);

  const isPossibleCreateParticipant = useMemo(() => {
    if (!participants) return false;
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
    } catch (error) {
      logOnBrowser(error);
    }
  }, []);

  const handleMoveToResultButtonClick = useCallback(() => {
    router.push(`/${eventID}/result`);
  }, [eventID, router]);

  const handleSubmitButtonClick = useCallback(async () => {
    try {
      setIsLoading(true);
      const availableIndexes = getAvailableIndexes();

      const { success } = await updateParticipant({
        participantID,
        availableIndexes,
      });

      if (success) {
        handleMoveToResultButtonClick();
      }
    } catch (error) {
      logOnBrowser(error);
    } finally {
      setIsLoading(false);
    }
  }, [getAvailableIndexes, handleMoveToResultButtonClick, participantID]);

  useEffect(() => {
    if (participantCID) setParticipantID(participantCID);
  }, [participantCID]);

  useEffect(() => {
    handleTimetableChange(completeTimetable);
  }, [completeTimetable, handleTimetableChange, participant]);

  if (!participant) {
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
          <Inner direction="column">
            <Flex direction="column" isFull gap={3}>
              <Flex align="center" justify="end" isFull>
                <Button
                  onClick={handleShareButtonClick}
                  variant="outline"
                  colorScheme="gray"
                  leftElement={<Icon name="share" size={16} />}
                  radius="pill"
                  size="sm"
                  shadow>
                  <Text content="초대 링크 공유" size="sm" />
                </Button>
              </Flex>
              <Title direction="column">
                <Flex align="center" gap={4}>
                  <Icon name="calendar" size={25} />
                  <Text content={event.title} size="2xl" weight="bold" />
                </Flex>
                {participant && (
                  <Flex gap={2}>
                    <Text content={participant.name} weight="bold" size="sm" />
                    <Text content="님의 시간표" size="sm" />
                  </Flex>
                )}
                <Text content="30분 단위로 약속 시간을 선택해주세요" size="sm" />
              </Title>
            </Flex>
            <Timetable
              startDate={event.startDate}
              endDate={event.endDate}
              startTime={event.startTime}
              endTime={event.endTime}
              timetable={timetable}
              handleTimetableChange={handleTimetableChange}
            />

            <Flex direction="column" isFull gap={5}>
              <ButtonWrapper justify="center" isFull>
                <Button
                  variant="link"
                  colorScheme="gray"
                  rightElement={<Icon name="caret-right" />}
                  onClick={handleMoveToResultButtonClick}>
                  <Text content="다른 참여자의 시간표가 궁금하신가요?" size="sm" />
                </Button>
              </ButtonWrapper>
              <ButtonWrapper justify="center" isFull>
                <Button
                  radius="pill"
                  size="2xl"
                  onClick={handleSubmitButtonClick}
                  isLoading={isLoading}>
                  <Text content="제출하기" color="white" size="xl" weight="bold" />
                </Button>
              </ButtonWrapper>
            </Flex>
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

  const baseurl = process.env.NEXT_PUBLIC_BASEURL;
  const { event } = await getEventAPI({ path: baseurl + getEventPath({ eventID: id }) });

  if (!event) return { notFound: true };

  return {
    props: {
      event,
      eventID: id,
      participantCID,
    },
  };
};

const Title = styled(Flex, {
  gap: '$2',
  '@bp3': { gap: '$3' },
});

const Inner = styled(Flex, {
  color: '$gray800',

  w: '$full',
  px: '$5',
  gap: '$12',

  '@bp2': {
    minW: '$300',
    maxW: '$300',
    gap: '$15',
  },
  '@bp3': {
    minW: '$400',
    maxW: '$400',
  },

  [`.${darkTheme} &`]: {
    color: '$white',
  },
});

const ButtonWrapper = styled(Flex, {
  '&:not(:last-child)': {
    pt: '$20',
  },
});

export default Event;
