import { Dispatch, SetStateAction, useMemo } from 'react';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const ReactCalendar = dynamic(() => import('react-calendar'), { ssr: false });

interface CalendarProps {
  date: Date | [Date | null, Date | null] | null | undefined;
  setDate: Dispatch<
    SetStateAction<Date | [Date | null, Date | null] | null | undefined>
  >;
}

function Calendar({ date, setDate }: CalendarProps) {
  const minDate = useMemo(() => {
    if (!date) return undefined;
    const [min] = date as [Date | null, Date | null];
    if (min) return dayjs(min).subtract(6, 'day').toDate();
  }, [date]);

  const maxDate = useMemo(() => {
    if (!date) return undefined;
    const [min] = date as [Date | null, Date | null];
    if (min) return dayjs(min).add(6, 'day').toDate();
  }, [date]);

  return (
    <ReactCalendar
      onChange={setDate}
      formatDay={(_, date) => dayjs(date).format('D')}
      value={date}
      selectRange={true}
      allowPartialRange={true}
      minDate={minDate}
      maxDate={maxDate}
      showNeighboringMonth={false}
    />
  );
}

export default Calendar;
