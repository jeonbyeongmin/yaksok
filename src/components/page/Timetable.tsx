import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { useCallback, useMemo, useRef } from 'react';

import { Flex, Text } from '@/components/primitive';
import { darkTheme, styled, VariantProps } from '@/styles/stitches.config';

type CellType = VariantProps<typeof Cell>;

interface TimetableProps {
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
  timetable: number[][];
  participantsNumber?: number;
  isSimple?: boolean;
  cellHeight?: CellType['cellHeight'];
  selectedTimetablePartition?: TimetablePartition;
  handleTimetableChange?: (timetable: number[][]) => void;
}

function Timetable({
  startDate,
  endDate,
  startTime,
  endTime,
  timetable,
  participantsNumber = 1,
  cellHeight = 'md',
  isSimple = false,
  selectedTimetablePartition,
  handleTimetableChange,
}: TimetableProps) {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation('common');

  const readOnly = useMemo(() => {
    return !handleTimetableChange;
  }, [handleTimetableChange]);

  const dates = useMemo(() => {
    const dates = [];
    let date = dayjs(startDate);
    const end = dayjs(endDate);
    while (date.isBefore(end)) {
      dates.push(date);
      date = date.add(1, 'day');
    }
    return dates;
  }, [endDate, startDate]);

  const times = useMemo(() => {
    const times = [];
    for (let time = startTime; time <= endTime; time++) {
      times.push(time);
    }
    return times;
  }, [endTime, startTime]);

  const getTimetableBorders = useCallback((row: number, column: number) => {
    const borderTop: CellType['borderTop'] = row === 0 ? 'solidGray' : 'none';
    const borderLeft: CellType['borderLeft'] =
      column === 0 ? 'solidGray' : 'none';
    const borderRight: CellType['borderRight'] = 'solidGray';
    const borderBottom: CellType['borderBottom'] =
      row % 2 !== 0 ? 'solidGray' : 'dashedGray';
    return { borderTop, borderLeft, borderRight, borderBottom };
  }, []);

  const getTimetableBackground = useCallback(
    (row: number, column: number, value: number) => {
      if (
        selectedTimetablePartition &&
        selectedTimetablePartition.startRow <= row &&
        selectedTimetablePartition.endRow >= row &&
        selectedTimetablePartition.col === column
      ) {
        return resolvedTheme === 'dark' ? '$lighten200' : '$darken200';
      }

      return value
        ? `rgba(88, 184, 238, ${(0.8 * value) / participantsNumber})`
        : '$panel';
    },
    [participantsNumber, resolvedTheme, selectedTimetablePartition],
  );

  const getDay = useCallback(
    (date: dayjs.Dayjs) => {
      return t('days').split(',')[date.get('day')];
    },
    [t],
  );

  return (
    <TimetableWrapper direction='column' isFull>
      {!isSimple ? (
        <DateRow gap={4} isFull>
          <BlankCell />
          <Flex isFull>
            {dates.map((date, index) => (
              <DateCell
                key={index}
                align='center'
                justify='center'
                direction='column'
              >
                <Text
                  size='sm'
                  color='gray400'
                  content={date.format('MM/DD')}
                />
                <Text
                  size='sm'
                  color='gray400'
                  content={getDay(date)}
                  weight='bold'
                />
              </DateCell>
            ))}
          </Flex>
        </DateRow>
      ) : null}

      {timetable.map((row, rowIndex) => (
        <Table key={rowIndex} gap={3} isFull>
          {!isSimple ? (
            <BlankCell align='start' justify='end'>
              {rowIndex % 2 === 0 && (
                <Text
                  color='gray400'
                  size='sm'
                  content={`${times[rowIndex / 2]}`}
                />
              )}
            </BlankCell>
          ) : null}

          <Flex isFull>
            {row.map((col, colIndex) => (
              <Flex key={colIndex} direction='column' isFull>
                <Cell
                  cellHeight={cellHeight}
                  data-row={rowIndex}
                  data-col={colIndex}
                  borderTop={getTimetableBorders(rowIndex, colIndex).borderTop}
                  borderLeft={
                    getTimetableBorders(rowIndex, colIndex).borderLeft
                  }
                  borderRight={
                    getTimetableBorders(rowIndex, colIndex).borderRight
                  }
                  borderBottom={
                    getTimetableBorders(rowIndex, colIndex).borderBottom
                  }
                  css={{
                    bgColor: getTimetableBackground(rowIndex, colIndex, col),
                  }}
                />
              </Flex>
            ))}
          </Flex>
        </Table>
      ))}
    </TimetableWrapper>
  );
}

const TimetableWrapper = styled(Flex, {
  userSelect: 'none',
});

const Table = styled(Flex, {
  cursor: 'pointer',
});

const DateRow = styled(Flex, {
  w: '$100',
  mb: '$3',
});

const DateCell = styled(Flex, {
  flex: 1,
});

const BlankCell = styled(Flex, {
  'w': '$10',
  '@bp1': { w: '$15' },
  'flexShrink': 0,
});

const Cell = styled('div', {
  display: 'flex',
  flex: 1,

  variants: {
    cellHeight: {
      sm: { minH: '$10' },
      md: {
        'minH': '$25',
        '@bp1': { minH: '$18' },
      },
      lg: { minH: '$16' },
    },

    borderTop: {
      solidGray: {
        borderTop: '1px solid $gray200',
        [`.${darkTheme} &`]: { borderTop: '1px solid $gray400' },
      },
      none: { borderTop: '0px' },
    },
    borderLeft: {
      solidGray: {
        borderLeft: '1px solid $gray200',
        [`.${darkTheme} &`]: { borderLeft: '1px solid $gray400' },
      },
      none: { borderLeft: '0px' },
    },
    borderRight: {
      solidGray: {
        borderRight: '1px solid $gray200',
        [`.${darkTheme} &`]: { borderRight: '1px solid $gray400' },
      },
      none: { borderRight: '0px' },
    },
    borderBottom: {
      solidGray: {
        borderBottom: '1px solid $gray200',
        [`.${darkTheme} &`]: { borderBottom: '1px solid $gray400' },
      },
      dashedGray: {
        borderBottom: '1px dashed $gray200',
        [`.${darkTheme} &`]: { borderBottom: '1px dashed $gray400' },
      },
    },
  },
  defaultVariants: {
    cellHeight: 'md',
  },
});

export default Timetable;
