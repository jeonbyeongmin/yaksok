import type { GetServerSideProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { AnimateContainer } from '@/components/page/home/animate-container';
import { Calendar } from '@/components/page/home/calendar';
import { SelectorCard } from '@/components/page/home/selector-card';
import { TimeSelector } from '@/components/page/home/time-selector';
import { Box, Button, Flex, Grid, Icon, Input, Text } from '@/components/primitive';
import { useEventForm } from '@/hooks/use-event-form';
import { styled } from '@/styles/stitches.config';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation(['common', 'home-page']);

  const {
    eventForm,
    isLoading,
    error,
    handleTitleChange,
    handleDateChange,
    handleStartTime,
    handleEndTime,
    handleEventCreate,
  } = useEventForm({ t });

  const handleSubmit = async () => {
    const eventId = await handleEventCreate();
    if (eventId) {
      router.push(`${eventId}`);
    }
  };

  return (
    <>
      <TopsideWrapper justify='center' align='center'>
        <AnimateContainer>
          <Input
            name='title'
            leftElement={<Icon name='calendar' size={20} />}
            placeholder={t('home-page:form.event-title.placeholder')}
            value={eventForm.title}
            onChange={handleTitleChange}
            variant='blurred'
            size='xl'
            radius='pill'
          />
        </AnimateContainer>
      </TopsideWrapper>
      <BottomsideWrapper>
        <BottomsideInnerWrapper>
          <CustomGrid align='start' justify='center'>
            <SelectorCard
              title={t('home-page:form.event-date.title')}
              description={t('home-page:form.event-date.description')}
            >
              <Calendar date={eventForm.date} onChange={handleDateChange} />
            </SelectorCard>
            <SelectorCard title={t('home-page:form.event-time.title')}>
              <TimeSelector
                label={t('home-page:form.event-time.start.label')}
                handleValue={handleStartTime}
                value={eventForm.startTime}
                enableTime={[0, 23]}
              />
              <TimeSelector
                label={t('home-page:form.event-time.end.label')}
                handleValue={handleEndTime}
                value={eventForm.endTime}
                enableTime={[Number(eventForm.startTime) + 1, 24]}
              />
            </SelectorCard>
          </CustomGrid>
        </BottomsideInnerWrapper>
      </BottomsideWrapper>
      <ButtonWrapper justify='center' align='center' direction='column'>
        <ErrorWrapper>
          <Text content={error} color='red' size='sm' />
        </ErrorWrapper>
        <Button size='2xl' onClick={handleSubmit} radius='pill' isLoading={isLoading}>
          <Text
            content={t('home-page:button.submit')}
            color='white'
            size='xl'
            weight='bold'
          />
        </Button>
      </ButtonWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'home-page'])),
  },
});

const CustomGrid = styled(Grid, {
  '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
  '@bp2': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@bp3': { gridTemplateColumns: 'repeat(2, 1fr)' },
  'rowGap': '$20',
});

const TopsideWrapper = styled(Flex, {
  'h': '$100',
  '@bp1': { h: '$140' },
});

const BottomsideWrapper = styled(Box, {
  w: '100%',
  py: '$20',
  bg: '$panel',
});

const BottomsideInnerWrapper = styled(Box, {
  maxW: '$400',
  m: '0 auto',
});

const ButtonWrapper = styled(Flex, {
  py: '$20',
  background: '$panel',
  flex: 1,
  position: 'relative',
});
const ErrorWrapper = styled(Flex, {
  py: '$5',
  position: 'absolute',
  top: '0',
});
