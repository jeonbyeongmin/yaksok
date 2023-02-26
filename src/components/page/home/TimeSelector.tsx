import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/primitive/Select';

import { Box } from '@/components/primitive/Box';
import { styled } from '@/styles/stitches.config';

interface TimeSelectorProps {
  handleValue: (value: string) => void;
  value: string;
  enableTime?: [number, number];
}

const am = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const pm = [
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

function TimeSelector({ handleValue, value, enableTime }: TimeSelectorProps) {
  return (
    <Select onValueChange={handleValue} value={value}>
      <SelectGroup>
        <LabelWrapper>
          <SelectLabel>오전</SelectLabel>
        </LabelWrapper>
        <SelectSeparator />
        {am.map((time) => (
          <SelectItem
            value={time}
            disabled={
              enableTime
                ? Number(time) < enableTime[0] || Number(time) > enableTime[1]
                : false
            }
            key={time}
          >
            {time}시
          </SelectItem>
        ))}
      </SelectGroup>
      <SelectSeparator size="lg" />
      <SelectGroup>
        <LabelWrapper>
          <SelectLabel>오후</SelectLabel>
        </LabelWrapper>
        <SelectSeparator />
        {pm.map((time) => (
          <SelectItem
            value={time}
            disabled={
              enableTime
                ? Number(time) < enableTime[0] || Number(time) > enableTime[1]
                : false
            }
            key={time}
          >
            {time}시
          </SelectItem>
        ))}
      </SelectGroup>
    </Select>
  );
}

const LabelWrapper = styled(Box, {
  p: '$4 $7',
  color: '$gray500',
});

export default TimeSelector;
