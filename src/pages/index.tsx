import { darkTheme, styled } from '@/styles/stitches.config';
import { useMemo, useState } from 'react';

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

  const isAvailable = useMemo(() => {
    if (title && name && participantsNumber && date && startTime && endTime) {
      return true;
    }
    return false;
  }, [date, endTime, name, participantsNumber, startTime, title]);

  const handleStartTime = (value: string) => {
    setStartTime(value);
    if (Number(value) >= Number(endTime)) {
      setEndTime(value);
    }
  };

  const handleCreateEvent = async () => {
    const [startDate, endDate] = date as [Date, Date];
    const event = await CreateEventAPI({
      title,
      startDate,
      endDate,
      participantsNumber: Number(participantsNumber),
      startTime: Number(startTime),
      endTime: Number(endTime),
    });

    const { _id } = event.data;
    const { success } = await CreateParticipantAPI({ name, eventID: _id, availableIndexes: [] });

    if (!success) return;

    router.push(`/${_id}`);
  };

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
              width="50rem"
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
          <Grid columns={2} align="start" justify="center">
            <SelectorWrapper direction="column" gap={2}>
              <Divider />
              <Text content="날짜를 입력해주세요" size="lg" weight="bold" />
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
                  handleValue={setEndTime}
                  value={endTime}
                  enableTime={[Number(startTime), 23]}
                />
                <Text content="까지" weight="bold" color="gray500" />
              </TimeSelectorWrapper>
            </SelectorWrapper>
          </Grid>
        </BottomsideInnerWrapper>
      </BottomsideWrapper>
      <ButtonWrapper justify="center">
        <Button
          size="2xl"
          onClick={handleCreateEvent}
          radius="pill"
          color="primary"
          disabled={!isAvailable}>
          <Text content="약속 만들기" color="white" size="lg" weight="bold" />
        </Button>
      </ButtonWrapper>
    </Layout>
  );
}

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
