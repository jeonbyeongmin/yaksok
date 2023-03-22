import { Select, SelectItem } from '@/components/primitive/Select';
import { useTranslation } from 'next-i18next';

interface TimeSelectorProps {
  handleValue: (value: string) => void;
  value: string | undefined;
}

const participantNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];

function ParticipantNumberSelector({ handleValue, value }: TimeSelectorProps) {
  const { t } = useTranslation(['common', 'home-page']);

  return (
    <Select
      placeholder={t('home-page:form.number.placeholder')}
      variant="blurred"
      onValueChange={handleValue}
      value={value}>
      {participantNumbers.map((number) => (
        <SelectItem key={number} value={number}>
          {number}
        </SelectItem>
      ))}
    </Select>
  );
}

export default ParticipantNumberSelector;
