import type { Event } from 'common/inerfaces/Event.interface';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { forwardRef, Fragment, useCallback, useMemo } from 'react';

import { Text } from '@/components/primitive';
import { darkTheme, styled } from '@/styles/stitches.config';

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
              />
            ))}
          </TR>
        ))}
      </TBody>
    </Table>
  );
});

const Table = styled('table', {
  'userSelect': 'none',
  'width': '$full',
  'backgroundColor': '$panel',
  'borderCollapse': 'collapse',
  'borderSpacing': 0,
  'borderRadius': '$2xl',
  'overflow': 'hidden',
  'boxShadow': '$2',

  '& th': {
    borderBottom: '1px solid',
  },

  '& th, & td': {
    'borderColor': '$gray200',
    'padding': '$4 $3',

    '&:not(:last-child)': {
      borderRight: '1px solid $gray200',
    },

    [`.${darkTheme} &`]: {
      borderColor: '$gray700',
    },
  },
});

const THead = styled('thead', {});
const TBody = styled('tbody', {});

const TR = styled('tr', {});

const TH = styled('th', {
  verticalAlign: 'top',

  // '&:first-child ': {
  //   borderBottom: 'none',
  // },
});

const TD = styled('td', {
  'borderBottom': '1px solid',
  'cursor': 'pointer',
  'h': '$25',

  '@bp1': { h: '$18' },

  '&:hover': {
    backgroundColor: '$gray100',
  },

  [`.${darkTheme} &`]: {
    '&:hover': {
      backgroundColor: '$gray800',
    },
  },

  'variants': {
    isEven: {
      true: {
        borderBottom: '1px dashed',
      },
    },
    active: {
      true: {
        'backgroundColor': '$lighten200',
        '&:hover': {
          backgroundColor: '$lighten200',
        },
        [`.${darkTheme} &`]: {
          'backgroundColor': '$primary200',
          '&:hover': {
            backgroundColor: '$primary200',
          },
        },
      },
    },
  },
});

DraggableTimetable.displayName = 'DraggableTimetable';
