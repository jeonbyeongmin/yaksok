import type { DateType } from '@/components/page/home/calendar';
import type { TFunction } from 'next-i18next';

import { logOnBrowser } from 'common/utils/log';
import { ChangeEvent, useReducer, useState } from 'react';

import { eventFormActions } from '@/actions/event-form.action';
import { createEventAPI } from '@/api/events/create-event';
import { eventFormInitialState, eventFormReducer } from '@/reducers/event-form.reducer';

export const useEventForm = ({ t }: { t: TFunction }) => {
  const [eventForm, dispatch] = useReducer(eventFormReducer, eventFormInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(eventFormActions.changeTitle(e.target.value));
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
    const { title, date, startTime, endTime } = eventForm;
    if (!title) throw new Error(t('common:error.change-event-title'));
    if (!date) throw new Error(t('common:error.change-event-date'));
    if (!startTime) throw new Error(t('common:error.change-event-start-time'));
    if (!endTime) throw new Error(t('common:error.change-event-end-time'));
  };

  const createEvent = async () => {
    const params = {};
    const [startDate, endDate] = eventForm.date as [Date, Date];
    const body = {
      startDate,
      endDate,
      title: eventForm.title,
      startTime: Number(eventForm.startTime),
      endTime: Number(eventForm.endTime) - 1,
    };

    const { event } = await createEventAPI(params, body);

    return event._id;
  };

  const handleEventCreate = async () => {
    try {
      validate();
      setIsLoading(true);

      const eventId = await createEvent();

      return eventId;
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
    handleDateChange,
    handleStartTime,
    handleEndTime,
    handleEventCreate,
  };
};
