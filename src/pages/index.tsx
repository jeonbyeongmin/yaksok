import { ChangeEvent, useState } from 'react';
import { Select, SelectItem } from '@/components/primitive/Select';

import AnimateContainer from '@/components/AnimateContainer';
import { Box } from '@/components/primitive/Box';
import { Button } from '@/components/primitive/Button';
import Calendar from '@/components/Calendar';
import { CalendarIcon } from '@/components/assets/CalendarIcon';
import { CreateEventAPI } from '@/api/events/create-event';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { Flex } from '@/components/primitive/Flex';
import { Grid } from '@/components/primitive/Grid';
import { Input } from '@/components/primitive/Input';
import Layout from '@/components/Layout';
import { Text } from '@/components/primitive/Text';
import TimeSelector from '@/components/TimeSelector';
import { styled } from '@/styles/stitches.config';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [participantsNumber, setParticipantsNumber] = useState<string>();
  const [date, setDate] = useState<
    Date | [Date | null, Date | null] | null | undefined
  >();
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('1');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleParticipantsNumber = (value: string) => {
    setParticipantsNumber(value);
  };

  const handleStartTime = (value: string) => {
    setStartTime(value);

    if (Number(value) >= Number(endTime)) {
      setEndTime(value);
    }
  };

  const handleEndTime = (value: string) => {
    setEndTime(value);
  };

  const isAvailable = () => {
    if (
      title &&
      name &&
      participantsNumber &&
      date &&
      startTime &&
      endTime &&
      Number(startTime) <= Number(endTime)
    ) {
      return true;
    }
    return false;
  };

  const handleCreateEvent = async () => {
    if (!isAvailable()) return;
    const [startDate, endDate] = date as [Date, Date];

    const event = await CreateEventAPI({
      title,
      startDate,
      endDate,
      participantsNumber: Number(participantsNumber) ?? 2,
      startTime: Number(startTime),
      endTime: Number(endTime),
    });

    const { _id } = event.data;

    await CreateParticipantAPI({ name, eventID: _id, availableIndexes: [] });

    router.push(`/${_id}`);
  };

  return (
    <Layout>
      <TopsideWrapper justify="center" align="center">
        <AnimateContainer>
          <Flex justify="center" align="center" direction="column" gap={30}>
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
              <Select
                placeholder="인원수를 선택해주세요"
                onValueChange={handleParticipantsNumber}
                value={participantsNumber}
                variant="blurred"
              >
                <SelectItem value="2">2명</SelectItem>
                <SelectItem value="3">3명</SelectItem>
                <SelectItem value="4">4명</SelectItem>
                <SelectItem value="5">5명</SelectItem>
                <SelectItem value="6">6명</SelectItem>
                <SelectItem value="7">7명</SelectItem>
                <SelectItem value="8">8명</SelectItem>
              </Select>
            </Flex>
          </Flex>
        </AnimateContainer>
      </TopsideWrapper>
      <BottomsideWrapper>
        <BottomsideInnerWrapper>
          <Grid columns={2} align="start" justify="center">
            <CalendarWrapper direction="column" gap={2}>
              <Divider />
              <Text
                content="날짜를 입력해주세요"
                size="lg"
                color="gray700"
                weight="bold"
              />
              <Text
                content="최대 7일까지 선택 가능합니다"
                size="xs"
                color="gray400"
              />
              <Calendar date={date} setDate={setDate} />
            </CalendarWrapper>
            <TimeSelectorContainer direction="column" gap={2}>
              <Divider />
              <Text
                content="시간을 선택해주세요"
                size="lg"
                color="gray700"
                weight="bold"
              />
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
                  enableTime={[Number(startTime), 23]}
                />
                <Text content="까지" weight="bold" color="gray500" />
              </TimeSelectorWrapper>
            </TimeSelectorContainer>
          </Grid>
        </BottomsideInnerWrapper>
      </BottomsideWrapper>
      <ButtonWrapper justify="center">
        <Button
          size="2xl"
          onClick={handleCreateEvent}
          radius="pill"
          color="primary"
        >
          <Text content="약속 만들기" color="white" size="2xl" weight="bold" />
        </Button>
      </ButtonWrapper>
    </Layout>
  );
}

const TopsideWrapper = styled(Flex, {
  pt: '$30',
  h: '$200',
  bg: '$linearLightBg100',
});

const BottomsideWrapper = styled(Box, {
  w: '100%',
  py: '$20',
  bgColor: '$white',
});

const BottomsideInnerWrapper = styled(Box, {
  maxW: '$400',
  m: '0 auto',
});

const CalendarWrapper = styled(Flex, {
  boxShadow: '$1',
  p: '$10',
  borderRadius: '$md',
});

const TimeSelectorContainer = styled(Flex, {
  boxShadow: '$1',
  p: '$10',
  borderRadius: '$md',
  w: '34rem',
});

const TimeSelectorWrapper = styled(Flex, {
  borderRadius: '$md',
  w: '$full',
  gap: '$6',
  mt: '$4',
});

const ButtonWrapper = styled(Flex, {
  my: '$20',
});

const Divider = styled(Box, {
  w: '$full',
  h: '1px',
  bg: '$gray200',
  my: '$4',
});
