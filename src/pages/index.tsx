import { Box, Button, Flex, Grid, Icon, Input, Text } from '@/components/primitive';
import { darkTheme, styled } from '@/styles/stitches.config';

import { AnimateContainer } from '@/components/page/home/AnimateContainer';
import { Calendar, DateType } from '@/components/page/home/Calendar';
import { CreateEventAPI } from '@/api/events/create-event';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { Layout } from '@/components/layout/Layout';
import { ParticipantNumberSelector } from '@/components/page/home/ParticipantNumberSelector';
import { TimeSelector } from '@/components/page/home/TimeSelector';
import { logOnBrowser } from 'common/utils/log';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useReducer, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { eventFormInitialState, eventFormReducer } from '@/reducers/event-form.reducer';
import { eventFormActions } from '@/actions/event-form.action';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation(['common', 'home-page']);

  const [eventForm, dispatch] = useReducer(eventFormReducer, eventFormInitialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(eventFormActions.changeTitle(e.target.value));
  }, []);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(eventFormActions.changeName(e.target.value));
  }, []);

  const handleParticipantsNumberChange = useCallback((participantsNumber: string) => {
    dispatch(eventFormActions.changeParticipantsNumber(participantsNumber));
  }, []);

  const handleDateChange = useCallback((date: DateType) => {
    dispatch(eventFormActions.changeDate(date));
  }, []);

  const handleStartTime = useCallback((startTime: string) => {
    dispatch(eventFormActions.changeStartTime(startTime));
  }, []);

  const handleEndTime = useCallback((endTime: string) => {
    dispatch(eventFormActions.changeEndTime(endTime));
  }, []);

  const validate = () => {
    const { title, name, participantsNumber, date, startTime, endTime } = eventForm;
    if (!title) throw new Error(t('home-page:form.event-title.error'));
    if (!name) throw new Error(t('home-page:form.name.error'));
    if (!participantsNumber) throw new Error(t('home-page:form.number.error'));
    if (!date) throw new Error(t('home-page:form.event-date.error'));
    if (!startTime) throw new Error(t('home-page:form.event-time.start.error'));
    if (!endTime) throw new Error(t('home-page:form.event-time.end.error'));
  };

  const createEvent = async () => {
    const { title, participantsNumber, date, startTime, endTime } = eventForm;
    const [startDate, endDate] = date as [Date, Date];

    const event = await CreateEventAPI({
      title,
      startDate,
      endDate,
      participantsNumber: Number(participantsNumber),
      startTime: Number(startTime),
      endTime: Number(endTime) - 1,
    });
    return event.data._id;
  };

  const createParticipant = async (eventID: string) => {
    const { name } = eventForm;
    const { success } = await CreateParticipantAPI({ name, eventID, availableIndexes: [] });
    if (!success) throw new Error(t('common:api-error.create-participant'));
  };

  const handleCreateEvent = async () => {
    try {
      validate();
      setIsLoading(true);

      const eventID = await createEvent();
      await createParticipant(eventID);

      router.push(`/${eventID}`);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      logOnBrowser(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <TopsideWrapper justify="center" align="center">
        <AnimateContainer>
          <TopsideInner justify="center" align="center" direction="column">
            <Input
              name="title"
              leftElement={<Icon name="calendar" size={20} />}
              placeholder={t('home-page:form.event-title.placeholder')}
              value={eventForm.title}
              onChange={handleTitleChange}
              variant="blurred"
              size="xl"
              radius="pill"
            />
            <TopsideSubInner direction="column" align="center" gap={7}>
              <Input
                name="name"
                placeholder={t('home-page:form.name.placeholder')}
                onChange={handleNameChange}
                value={eventForm.name}
                size="md"
                variant="blurred"
              />
              <ParticipantNumberSelector
                handleValue={handleParticipantsNumberChange}
                value={eventForm.participantsNumber}
              />
            </TopsideSubInner>
          </TopsideInner>
        </AnimateContainer>
      </TopsideWrapper>
      <BottomsideWrapper>
        <BottomsideInnerWrapper>
          <CustomGrid align="start" justify="center">
            <SelectorWrapper direction="column" gap={3}>
              <Divider />
              <Text content={t('home-page:form.event-date.title')} size="lg" weight="bold" />
              <Text
                content={t('home-page:form.event-date.description')}
                size="xs"
                color="gray400"
              />
              <Calendar date={eventForm.date} onChange={handleDateChange} />
            </SelectorWrapper>
            <SelectorWrapper direction="column" gap={3}>
              <Divider />
              <Text content={t('home-page:form.event-time.title')} size="lg" weight="bold" />
              <TimeSelectorWrapper align="center">
                <Text
                  content={t('home-page:form.event-time.start.label')}
                  weight="bold"
                  color="gray500"
                  css={{ minW: '$23' }}
                />
                <TimeSelector
                  handleValue={handleStartTime}
                  value={eventForm.startTime}
                  enableTime={[0, 23]}
                />
              </TimeSelectorWrapper>
              <TimeSelectorWrapper align="center">
                <Text
                  content={t('home-page:form.event-time.end.label')}
                  weight="bold"
                  color="gray500"
                  css={{ minW: '$23' }}
                />
                <TimeSelector
                  handleValue={handleEndTime}
                  value={eventForm.endTime}
                  enableTime={[Number(eventForm.startTime) + 1, 24]}
                />
              </TimeSelectorWrapper>
            </SelectorWrapper>
          </CustomGrid>
        </BottomsideInnerWrapper>
      </BottomsideWrapper>

      <ButtonWrapper justify="center" align="center" direction="column">
        <ErrorWrapper>
          <Text content={error} color="red" size="sm" />
        </ErrorWrapper>
        <Button size="2xl" onClick={handleCreateEvent} radius="pill" isLoading={isLoading}>
          <Text content={t('home-page:button.submit')} color="white" size="xl" weight="bold" />
        </Button>
      </ButtonWrapper>
    </Layout>
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
  rowGap: '$20',
});

const TopsideWrapper = styled(Flex, {
  h: '$160',
  '@bp1': { h: '$180' },
  '@bp2': { h: '$200' },
  '@bp3': { h: '$200' },
});

const TopsideInner = styled(Flex, {
  w: '$full',
  h: '$full',
  pt: '$30',
  px: '$10',
  gap: '$20',
  '@bp1': { w: '$250' },
});

const TopsideSubInner = styled(Flex, {
  w: '$150',
  px: '$10',
  gap: '$20',
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

const SelectorWrapper = styled(Flex, {
  boxShadow: '$1',
  p: '$10',
  borderRadius: '$md',
  w: '34rem',
  color: '$gray700',
  bgColor: '$box',
  border: '1px solid $line',

  [`.${darkTheme} &`]: {
    color: '$gray200',
  },
});

const TimeSelectorWrapper = styled(Flex, {
  borderRadius: '$md',
  w: '$full',
  mt: '$4',
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

const Divider = styled(Box, {
  w: '$full',
  h: '1px',
  bg: '$gray200',
  my: '$4',

  [`.${darkTheme} &`]: {
    bgColor: '$gray600',
  },
});
