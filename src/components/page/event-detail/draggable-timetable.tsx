import type { Event } from 'common/interfaces/event.interface';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { forwardRef, Fragment, useCallback, useMemo } from 'react';

import { Text } from '@/components/primitive';
import { Table, TBody, TD, TH, THead, TR } from '@/components/primitive/table';

interface Props {
  event: Event;
  value: boolean[][];
}

export const DraggableTimetable = forwardRef<HTMLTableElement, Props>((props, ref) => {
  const { t } = useTranslation('common');

  const { event, value } = props;

  const dates = useMemo(() => {
    const dates = [];
    let date = dayjs(event.startDate);
    const end = dayjs(event.endDate);
    while (date.isBefore(end)) {
      dates.push(date);
      date = date.add(1, 'day');
    }
    return dates;
  }, [event.endDate, event.startDate]);

  const times = useMemo(() => {
    const times = [];
    for (let time = event.startTime; time <= event.endTime; time++) {
      times.push(time);
    }
    return times;
  }, [event.endTime, event.startTime]);

  const getDay = useCallback(
    (date: dayjs.Dayjs) => {
      return t('days').split(',')[date.get('day')];
    },
    [t],
  );

  return (
    <Table ref={ref}>
      <THead>
        <TR>
          <TH></TH>
          {dates.map((date) => (
            <Fragment key={date.format('YYYY-MM-DD')}>
              <TH>
                <Text size='sm' color='gray400' content={date.format('MM/DD')} />
                <Text size='sm' color='gray400' content={getDay(date)} weight='bold' />
              </TH>
            </Fragment>
          ))}
        </TR>
      </THead>
      <TBody>
        {value.map((row, rowIndex) => (
          <TR key={rowIndex}>
            {rowIndex % 2 === 0 ? (
              <TH rowSpan={2} align='right'>
                <Text size='sm' color='gray400' content={`${times[rowIndex / 2]}`} />
              </TH>
            ) : null}
            {row.map((_, columnIndex) => (
              <TD
                key={columnIndex}
                isEven={rowIndex % 2 === 0}
                active={value[rowIndex][columnIndex]}
                clickable
              />
            ))}
          </TR>
        ))}
      </TBody>
    </Table>
  );
});

DraggableTimetable.displayName = 'DraggableTimetable';
