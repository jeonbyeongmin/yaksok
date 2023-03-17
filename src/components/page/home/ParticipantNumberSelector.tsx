import { Select, SelectItem } from '@/components/primitive/Select';

interface TimeSelectorProps {
  handleValue: (value: string) => void;
  value: string | undefined;
}

const participantNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];

function ParticipantNumberSelector({ handleValue, value }: TimeSelectorProps) {
  return (
    <Select
      // placeholder="인원수를 선택해주세요"
      variant="blurred"
      onValueChange={handleValue}
      value={value}>
      {participantNumbers.map((number) => (
        <SelectItem key={number} value={number}>
          {number}명
        </SelectItem>
      ))}
    </Select>
  );
}

export default ParticipantNumberSelector;
