interface PossibleDate {
  startDate: Date;
  endDate: Date;
}

export interface Participant {
  name: string;
  eventID: string;
  possibleDates?: PossibleDate[];
}
