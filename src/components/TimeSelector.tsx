import { Select } from '@chakra-ui/react';

interface TimeSelectorProps {
  handleValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  enableTime?: [number, number];
}

const time = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

function TimeSelector({ handleValue, value, enableTime }: TimeSelectorProps) {
  return (
    <Select onChange={handleValue} value={value}>
      {time.map((time) => (
        <option
          value={time}
          hidden={
            enableTime ? time < enableTime[0] || time > enableTime[1] : false
          }
          key={time}
        >
          {time}시
        </option>
      ))}
    </Select>
  );
}

export default TimeSelector;
