import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react';

import { BsCalendarEvent } from 'react-icons/bs';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <Flex w="full" bgColor="secondary" justify="center" align="center">
        <Flex
          w="100"
          py={10}
          justify="center"
          align="center"
          flexDirection="column"
          gap={10}
        >
          <InputGroup w="full">
            <InputLeftElement h="full" pointerEvents="none" alignSelf="center">
              <BsCalendarEvent />
            </InputLeftElement>
            <Input
              rounded="full"
              size="lg"
              w="lg"
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

      <Flex>
        <Text>날짜를 입력해주세요</Text>
      </Flex>
    </Layout>
  );
}
