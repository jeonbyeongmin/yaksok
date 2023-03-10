import { darkTheme, styled } from '@/styles/stitches.config';
import { getEventAPI, getEventPath } from '@/api/events/read-event';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { CaretRightIcon } from '@/components/assets/CaretRightIcon';
import { Flex } from '@/components/primitive/Flex';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout/Layout';
import LoadingMessage from '@/components/page/LoadingMessage';
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
import { useParticipantSWR } from '@/hooks/useParticipantSWR';
import { useParticipantsSWR } from '@/hooks/useParticipantsSWR';
import { useRouter } from 'next/router';
import { useTimetable } from '@/hooks/useTimetable';
import { Event } from 'common/inerfaces/Event.interface';

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
        title: '?????? ????????? ??????????????? ???????????????',
        message: '??????????????? ??????????????????!',
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
                <ShareButton
                  onClick={handleShareButtonClick}
                  color="light"
                  leftElement={<ShareIcon size={16} />}
                  radius="pill"
                  size="sm"
                  shadow
                  noBlank>
                  <Text content="?????? ?????? ??????" size="sm" />
                </ShareButton>
              </Flex>
              <Title direction="column">
                <Flex align="center" gap={4}>
                  <CalendarIcon size={25} />
                  <Text content={event.title} size="2xl" weight="bold" />
                </Flex>
                {participant && (
                  <Flex gap={2}>
                    <Text content={participant.name} weight="bold" size="sm" />
                    <Text content="?????? ?????????" size="sm" />
                  </Flex>
                )}
                <Text content="30??? ????????? ?????? ????????? ??????????????????" size="sm" />
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

            <Flex direction="column" isFull>
              <ButtonWrapper justify="center" isFull>
                <Button
                  ghost
                  rightElement={<CaretRightIcon />}
                  onClick={handleMoveToResultButtonClick}>
                  <Text content="?????? ???????????? ???????????? ???????????????????" size="sm" />
                </Button>
              </ButtonWrapper>
              <ButtonWrapper justify="center" isFull>
                <Button
                  radius="pill"
                  size="2xl"
                  color="primary"
                  onClick={!isLoading ? handleSubmitButtonClick : undefined}
                  isLoading={isLoading}>
                  <Text content="????????????" color="white" size="xl" weight="bold" />
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

const ShareButton = styled(Button, {
  color: '$gray300',

  [`.${darkTheme} &`]: {
    color: '$gray400',
  },
});

const ButtonWrapper = styled(Flex, {
  '&:not(:last-child)': {
    pt: '$20',
  },
});

export default Event;
