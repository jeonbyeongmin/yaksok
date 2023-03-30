import { useMemo } from 'react';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { OnChangeDateCallback, OnChangeDateRangeCallback } from 'react-calendar';

const ReactCalendar = dynamic(() => import('react-calendar'), { ssr: false });

interface CalendarProps {
  date: Date | [Date | null, Date | null] | null | undefined;
  onChange: OnChangeDateCallback | OnChangeDateRangeCallback | undefined;
}

function Calendar({ date, onChange }: CalendarProps) {
  const router = useRouter();

  const minDate = useMemo(() => {
    if (!date) return undefined;
    const [min, max] = date as [Date | null, Date | null];
    if (max) return undefined;
    if (min) return dayjs(min).toDate();
  }, [date]);

  const maxDate = useMemo(() => {
    if (!date) return undefined;
    const [min, max] = date as [Date | null, Date | null];
    if (max) return undefined;
    if (min) return dayjs(min).add(6, 'day').toDate();
  }, [date]);

  return (
    <ReactCalendar
      minDetail="month"
      onChange={onChange}
      formatDay={(_, date) => dayjs(date).format('D')}
      value={date}
      selectRange={true}
      calendarType="US"
      allowPartialRange={true}
      minDate={minDate}
      maxDate={maxDate}
      showNeighboringMonth={false}
      locale={router.locale}
    />
  );
}

export default Calendar;
