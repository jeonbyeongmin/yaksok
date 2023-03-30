import { DateType } from '@/components/page/home/Calendar';

export enum EventFormActionTypes {
  CHANGE_TITLE = 'CHANGE_TITLE',
  CHANGE_NAME = 'CHANGE_NAME',
  CHANGE_PARTICIPANTS_NUMBER = 'CHANGE_PARTICIPANTS_NUMBER',
  CHANGE_DATE = 'CHANGE_DATE',
  CHANGE_START_TIME = 'CHANGE_START_TIME',
  CHANGE_END_TIME = 'CHANGE_END_TIME',
}

export type EventFormActionType =
  | {
      type: EventFormActionTypes.CHANGE_TITLE;
      payload: { title: string };
    }
  | {
      type: EventFormActionTypes.CHANGE_NAME;
      payload: { name: string };
    }
  | {
      type: EventFormActionTypes.CHANGE_PARTICIPANTS_NUMBER;
      payload: { participantsNumber: string };
    }
  | {
      type: EventFormActionTypes.CHANGE_DATE;
      payload: { date: DateType };
    }
  | {
      type: EventFormActionTypes.CHANGE_START_TIME;
      payload: { startTime: string };
    }
  | {
      type: EventFormActionTypes.CHANGE_END_TIME;
      payload: { endTime: string };
    };

export const eventFormActions = {
  changeTitle: (title: string): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_TITLE,
    payload: { title },
  }),
  changeName: (name: string): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_NAME,
    payload: { name },
  }),
  changeParticipantsNumber: (participantsNumber: string): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_PARTICIPANTS_NUMBER,
    payload: { participantsNumber },
  }),
  changeDate: (date: DateType): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_DATE,
    payload: { date },
  }),
  changeStartTime: (startTime: string): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_START_TIME,
    payload: { startTime },
  }),
  changeEndTime: (endTime: string): EventFormActionType => ({
    type: EventFormActionTypes.CHANGE_END_TIME,
    payload: { endTime },
  }),
};
