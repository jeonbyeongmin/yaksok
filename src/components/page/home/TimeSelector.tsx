import { Box, Flex, Text } from '@/components/primitive';
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/primitive/Select';

import { styled } from '@/styles/stitches.config';
import { useTranslation } from 'next-i18next';

interface TimeSelectorProps {
  handleValue: (value: string) => void;
  value: string;
  enableTime?: [number, number];
  label: string;
}

const am = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const pm = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

export function TimeSelector({ handleValue, label, value, enableTime }: TimeSelectorProps) {
  const { t } = useTranslation(['common', 'home-page']);
  return (
    <TimeSelectorWrapper align="center">
      <Text content={label} weight="bold" color="gray500" css={{ minW: '$23' }} />
      <Select onValueChange={handleValue} value={value}>
        <SelectGroup>
          <LabelWrapper>
            <SelectLabel>{t('home-page:form.event-time.am')}</SelectLabel>
          </LabelWrapper>
          <SelectSeparator />
          {am.map((time) => (
            <SelectItem
              value={time}
              disabled={
                enableTime ? Number(time) < enableTime[0] || Number(time) > enableTime[1] : false
              }
              key={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator size="lg" />
        <SelectGroup>
          <LabelWrapper>
            <SelectLabel>{t('home-page:form.event-time.pm')}</SelectLabel>
          </LabelWrapper>
          <SelectSeparator />
          {pm.map((time) => (
            <SelectItem
              value={time}
              disabled={
                enableTime ? Number(time) < enableTime[0] || Number(time) > enableTime[1] : false
              }
              key={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </Select>
    </TimeSelectorWrapper>
  );
}

const TimeSelectorWrapper = styled(Flex, {
  borderRadius: '$md',
  w: '$full',
  mt: '$4',
});

const LabelWrapper = styled(Box, {
  p: '$4 $7',
  color: '$gray500',
});
