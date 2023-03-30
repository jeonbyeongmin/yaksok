import { ChangeEvent, useReducer, useState } from 'react';
import { CreateEventAPI } from '@/api/events/create-event';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { eventFormActions } from '@/actions/event-form.action';
import { eventFormInitialState, eventFormReducer } from '@/reducers/event-form.reducer';
import { logOnBrowser } from 'common/utils/log';

import type { DateType } from '@/components/page/home/Calendar';
import type { TFunction } from 'next-i18next';

export const useEventForm = ({ t }: { t: TFunction }) => {
  const [eventForm, dispatch] = useReducer(eventFormReducer, eventFormInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(eventFormActions.changeTitle(e.target.value));
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(eventFormActions.changeName(e.target.value));
  };
  const handleParticipantsNumberChange = (participantsNumber: string) => {
    dispatch(eventFormActions.changeParticipantsNumber(participantsNumber));
  };
  const handleDateChange = (date: DateType) => {
    dispatch(eventFormActions.changeDate(date));
  };
  const handleStartTime = (startTime: string) => {
    dispatch(eventFormActions.changeStartTime(startTime));
  };
  const handleEndTime = (endTime: string) => {
    dispatch(eventFormActions.changeEndTime(endTime));
  };

  const validate = () => {
    const { title, name, participantsNumber, date, startTime, endTime } = eventForm;
    if (!title) throw new Error(t('common:error.change-event-title'));
    if (!name) throw new Error(t('common:error.change-event-name'));
    if (!participantsNumber) throw new Error(t('common:error.change-event-number'));
    if (!date) throw new Error(t('common:error.change-event-date'));
    if (!startTime) throw new Error(t('common:error.change-event-start-time'));
    if (!endTime) throw new Error(t('common:error.change-event-end-time'));
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
    await CreateParticipantAPI({ name, eventID, availableIndexes: [] });
  };

  const handleEventCreate = async () => {
    try {
      validate();
      setIsLoading(true);

      const eventID = await createEvent();
      await createParticipant(eventID);

      return eventID;
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      logOnBrowser(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    eventForm,
    isLoading,
    error,
    handleTitleChange,
    handleNameChange,
    handleParticipantsNumberChange,
    handleDateChange,
    handleStartTime,
    handleEndTime,
    handleEventCreate,
  };
};
