import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BsCalendarEvent } from 'react-icons/bs';
import Layout from '@/components/Layout';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

export default function Home() {
  const [value, setValue] = useState<Date>();
  console.log('🚀 ~ file: index.tsx:20 ~ Home ~ value', value);

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
            >
              <BsCalendarEvent />
            </InputLeftElement>
            <Input
              rounded="full"
              size="lg"
              w="lg"
              pl="3rem"
              bgColor="white"
              placeholder="이벤트 제목을 입력해주세요"
              _placeholder={{ color: 'gray.500' }}
            />
          </InputGroup>
          <Flex flexDirection="column" gap={3}>
            <Input
              w="sm"
              bgColor="white"
              placeholder="이름을 입력해주세요"
              _placeholder={{ color: 'gray.500' }}
            />
            <Select placeholder="인원수를 선택해주세요" bgColor="white">
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
              <option value="option4">4</option>
              <option value="option5">5</option>
              <option value="option6">6</option>
              <option value="option7">7</option>
              <option value="option8">8</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={10}>
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
            onChange={setValue}
            formatDay={(locale, date) => dayjs(date).format('D')}
            value={value}
            selectRange={true}
            allowPartialRange={true}
            minDate={value ? dayjs(value).toDate() : undefined}
            maxDate={value ? dayjs(value).add(6, 'day').toDate() : undefined}
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
            <Input type="time" step="300" />
            <Text flexShrink={0}>부터</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Input type="time" step="300" required />
            <Text flexShrink={0}>까지</Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
