import { EventFormActionType, EventFormActionTypes } from '@/actions/event-form.action';
import { DateType } from '@/components/page/home/calendar';

type EventFormType = {
  title: string;
  date: DateType | null;
  startTime: string;
  endTime: string;
};

export const eventFormInitialState: EventFormType = {
  title: '',
  date: null,
  startTime: '0',
  endTime: '1',
};

// Reducer

export function eventFormReducer(eventForm: EventFormType, action: EventFormActionType) {
  const { type, payload } = action;

  switch (type) {
    case EventFormActionTypes.CHANGE_TITLE: {
      return {
        ...eventForm,
        title: payload.title,
      };
    }
    case EventFormActionTypes.CHANGE_DATE: {
      return {
        ...eventForm,
        date: payload.date,
      };
    }
    case EventFormActionTypes.CHANGE_START_TIME: {
      const startTime = payload.startTime;
      let endTime = eventForm.endTime;

      if (Number(startTime) >= Number(endTime)) {
        endTime = String(Number(startTime) + 1);
      }

      return {
        ...eventForm,
        startTime: payload.startTime,
        endTime,
      };
    }
    case EventFormActionTypes.CHANGE_END_TIME: {
      return {
        ...eventForm,
        endTime: payload.endTime,
      };
    }
  }
}
