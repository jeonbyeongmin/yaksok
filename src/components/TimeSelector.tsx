import { Flex, Select, Text } from '@chakra-ui/react';

interface TimeSelectorProps {}

function TimeSelector({}: TimeSelectorProps) {
  return (
    <Flex align="center" gap={1}>
      <Select w={150}>
        <option value="option1">AM</option>
        <option value="option2">PM</option>
      </Select>
      <Select>
        <option value="option1">1</option>
        <option value="option2">2</option>
        <option value="option3">3</option>
        <option value="option4">4</option>
        <option value="option5">5</option>
        <option value="option6">6</option>
        <option value="option7">7</option>
        <option value="option8">8</option>
        <option value="option9">9</option>
        <option value="option10">10</option>
        <option value="option11">11</option>
        <option value="option12">12</option>
      </Select>
    </Flex>
  );
}

export default TimeSelector;
