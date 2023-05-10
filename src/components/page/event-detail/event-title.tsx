import { useTranslation } from 'next-i18next';

import { Flex, Icon, Text } from '@/components/primitive';
import { styled } from '@/styles/stitches.config';

interface Props {
  title: string;
  participantName?: string;
}

export function EventTitle({ title, participantName }: Props) {
  const { t } = useTranslation(['common', 'event-page']);

  return (
    <Title direction='column'>
      <Flex align='center' gap={4}>
        <Icon name='calendar' size={25} />
        <Text content={title} size='2xl' weight='bold' />
      </Flex>
      <Flex gap={2}>
        <Text content={participantName ?? ''} weight='bold' size='sm' />
        <Text content={t('event-page:timetable.owner')} size='sm' />
      </Flex>
      <Text content={t('event-page:timetable.description')} size='sm' />
    </Title>
  );
}

const Title = styled(Flex, {
  'gap': '$2',
  '@bp3': { gap: '$3' },
});
