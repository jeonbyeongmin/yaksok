import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState } from 'react';

import { BsCalendarEvent } from 'react-icons/bs';
import Layout from '@/components/Layout';
import TimeSelector from '@/components/TimeSelector';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

export default function Home() {
  const [title, setTitle] = useState<string>('');
  const [participantsNumber, setParticipantsNumber] = useState<number>();
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('1');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleParticipantsNumber = (e: ChangeEvent<HTMLSelectElement>) => {
    setParticipantsNumber(Number(e.target.value));
  };

  const handleStartTime = (e: ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);

    if (Number(e.target.value) >= Number(endTime)) {
      setEndTime(String(Number(e.target.value) + 1));
    }
  };

  const handleEndTime = (e: ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
  };

  const isAvailable = useMemo(() => {
    if (
      title &&
      participantsNumber &&
      date &&
      startTime &&
      endTime &&
      Number(startTime) < Number(endTime)
    ) {
      return true;
    }
    return false;
  }, [date, endTime, participantsNumber, startTime, title]);

  console.log(
    '🚀 ~ file: index.tsx:48 ~ isAvailable ~ isAvailable',
    isAvailable
  );

  return (
    <Layout>
      <Flex w="full" bgColor="secondary" justify="center" align="center">
        <Flex
          py={10}
          justify="center"
          align="center"
          flexDirection="column"
          gap={10}
        >
          <InputGroup w="full">
            <InputLeftElement
              h="full"
              w="3.5rem"
              pointerEvents="none"
              alignSelf="center"
              color="gray.700"
            >
              <BsCalendarEvent />
            </InputLeftElement>
            <Input
              rounded="full"
              size="lg"
              w="lg"
              pl="3rem"
              bgColor="white"
              color="black"
              placeholder="이벤트 제목을 입력해주세요"
              onChange={handleTitle}
              value={title}
              _placeholder={{ color: 'gray.500' }}
            />
          </InputGroup>
          <Flex flexDirection="column" gap={3}>
            <Input
              w="sm"
              bgColor="white"
              color="black"
              placeholder="이름을 입력해주세요"
              _placeholder={{ color: 'gray.500' }}
            />
            <Select
              placeholder="인원수를 선택해주세요"
              bgColor="white"
              color="black"
              onChange={handleParticipantsNumber}
              value={participantsNumber}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={20} w="full" justify="center" py={20}>
        <Flex flexDirection="column" gap={1}>
          <Flex flexDirection="column">
            <Text fontSize="lg" color="gray.500" fontWeight="bold">
              날짜를 입력해주세요
            </Text>
            <Text fontSize="xs" color="gray.400">
              최대 7일까지 가능합니다
            </Text>
          </Flex>
          <Calendar
            onChange={setDate}
            formatDay={(locale, date) => dayjs(date).format('D')}
            value={date}
            selectRange={true}
            allowPartialRange={true}
            minDate={date ? dayjs(date).toDate() : undefined}
            maxDate={date ? dayjs(date).add(6, 'day').toDate() : undefined}
            showNeighboringMonth={false}
          />
        </Flex>
        <Flex flexDirection="column" gap={1}>
          <Flex flexDirection="column">
            <Text fontSize="lg" color="gray.500" fontWeight="bold">
              시간을 선택해주세요
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <TimeSelector
              handleValue={handleStartTime}
              value={startTime}
              enableTime={[0, 23]}
            />
            <Text flexShrink={0}>부터</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <TimeSelector
              handleValue={handleEndTime}
              value={endTime}
              enableTime={[Number(startTime) + 1, 24]}
            />
            <Text flexShrink={0}>까지</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="full" justify="center">
        <Button
          borderRadius="full"
          size="lg"
          bgColor="primary"
          color="white"
          isDisabled={!isAvailable}
        >
          이벤트 만들기
        </Button>
      </Flex>
    </Layout>
  );
}
