import { darkTheme, styled } from '@/styles/stitches.config';
import { useCallback, useMemo, useState } from 'react';

import AnimateContainer from '@/components/page/home/AnimateContainer';
import { Box } from '@/components/primitive/Box';
import { Button } from '@/components/primitive/Button';
import Calendar from '@/components/page/home/Calendar';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { CreateEventAPI } from '@/api/events/create-event';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { Flex } from '@/components/primitive/Flex';
import { Grid } from '@/components/primitive/Grid';
import { Input } from '@/components/primitive/Input';
import Layout from '@/components/layout/Layout';
import ParticipantNumberSelector from '@/components/page/home/ParticipantNumberSelector';
import { Text } from '@/components/primitive/Text';
import TimeSelector from '@/components/page/home/TimeSelector';
import { logOnBrowser } from 'common/utils/log';
import { makeToast } from '@/components/primitive/Toast';
import { useInputText } from '@/hooks/useInputText';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [title, handleTitleChange] = useInputText();
  const [name, handleNameChange] = useInputText();
  const [participantsNumber, setParticipantsNumber] = useState<string>();
  const [date, setDate] = useState<Date | [Date | null, Date | null] | null | undefined>();
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);

  const isAvailable = useMemo(() => {
    if (title && name && participantsNumber && date && startTime && endTime) {
      return true;
    }
    return false;
  }, [date, endTime, name, participantsNumber, startTime, title]);

  const handleStartTime = (value: string) => {
    setStartTime(value);
    if (Number(value) >= Number(endTime)) {
      setEndTime(String(Number(value) + 1));
    }
  };

  const handleEndTime = (value: string) => {
    setEndTime(value);
  };

  const handleCreateEvent = useCallback(async () => {
    try {
      setIsLoading(true);
      const [startDate, endDate] = date as [Date, Date];
      const event = await CreateEventAPI({
        title,
        startDate,
        endDate,
        participantsNumber: Number(participantsNumber),
        startTime: Number(startTime),
        endTime: Number(endTime) - 1,
      });

      const { _id } = event.data;
      const { success } = await CreateParticipantAPI({ name, eventID: _id, availableIndexes: [] });

      if (!success) return;

      router.push(`/${_id}`);

      await navigator.clipboard.writeText(`${window.location.href}/${_id}`);

      makeToast({
        type: 'success',
        title: '초대 링크를 클립보드에 복사했어요',
        message: '친구들에게 공유해보세요!',
      });
    } catch (error) {
      logOnBrowser(error);
    }

    setIsLoading(false);
  }, [date, endTime, name, participantsNumber, router, startTime, title]);

  return (
    <Layout>
      <TopsideWrapper justify="center" align="center">
        <AnimateContainer>
          <TopsideInner justify="center" align="center" direction="column" gap={30}>
            <Input
              leftElement={<CalendarIcon size={30} />}
              placeholder="약속 제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
              variant="blurred"
              scale="lg"
              radius="pill"
            />
            <Flex direction="column" gap={7}>
              <Input
                placeholder="이름을 입력해주세요"
                onChange={handleNameChange}
                value={name}
                width="24rem"
                variant="blurred"
              />
              <ParticipantNumberSelector
                handleValue={setParticipantsNumber}
                value={participantsNumber}
              />
            </Flex>
          </TopsideInner>
        </AnimateContainer>
      </TopsideWrapper>
      <BottomsideWrapper>
        <BottomsideInnerWrapper>
          <CustomGrid align="start" justify="center">
            <SelectorWrapper direction="column" gap={2}>
              <Divider />
              <Text content="시작 날짜 / 종료 날짜를 선택해주세요" size="lg" weight="bold" />
              <Text content="최대 7일까지 선택 가능합니다" size="xs" color="gray400" />
              <Calendar date={date} setDate={setDate} />
            </SelectorWrapper>
            <SelectorWrapper direction="column" gap={2}>
              <Divider />
              <Text content="시간을 선택해주세요" size="lg" weight="bold" />
              <TimeSelectorWrapper align="center">
                <TimeSelector
                  handleValue={handleStartTime}
                  value={startTime}
                  enableTime={[0, 23]}
                />
                <Text content="부터" weight="bold" color="gray500" />
              </TimeSelectorWrapper>
              <TimeSelectorWrapper align="center">
                <TimeSelector
                  handleValue={handleEndTime}
                  value={endTime}
                  enableTime={[Number(startTime) + 1, 24]}
                />
                <Text content="까지" weight="bold" color="gray500" />
              </TimeSelectorWrapper>
            </SelectorWrapper>
          </CustomGrid>
        </BottomsideInnerWrapper>
      </BottomsideWrapper>

      <ButtonWrapper justify="center">
        <Button
          size="2xl"
          onClick={!isLoading ? handleCreateEvent : undefined}
          radius="pill"
          color="primary"
          disabled={!isAvailable}
          isLoading={isLoading}>
          <Text content="약속 만들기" color="white" size="xl" weight="bold" />
        </Button>
      </ButtonWrapper>
    </Layout>
  );
}

const CustomGrid = styled(Grid, {
  '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
  '@bp2': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@bp3': { gridTemplateColumns: 'repeat(2, 1fr)' },
  rowGap: '$20',
});

const TopsideWrapper = styled(Flex, {
  h: '$200',
});

const TopsideInner = styled(Flex, {
  w: '$full',
  h: '$full',
  pt: '$30',
});

const BottomsideWrapper = styled(Box, {
  w: '100%',
  py: '$20',
  bg: '$panel',
});

const BottomsideInnerWrapper = styled(Box, {
  maxW: '$400',
  m: '0 auto',
});

const SelectorWrapper = styled(Flex, {
  boxShadow: '$1',
  p: '$10',
  borderRadius: '$md',
  w: '34rem',
  color: '$gray700',
  bgColor: '$box',
  border: '1px solid $line',

  [`.${darkTheme} &`]: {
    color: '$gray200',
  },
});

const TimeSelectorWrapper = styled(Flex, {
  borderRadius: '$md',
  w: '$full',
  gap: '$6',
  mt: '$4',
});

const ButtonWrapper = styled(Flex, {
  py: '$20',
  background: '$panel',
  flex: 1,
});

const Divider = styled(Box, {
  w: '$full',
  h: '1px',
  bg: '$gray200',
  my: '$4',

  [`.${darkTheme} &`]: {
    bgColor: '$gray600',
  },
});
