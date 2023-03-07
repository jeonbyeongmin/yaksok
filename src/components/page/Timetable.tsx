import { VariantProps, darkTheme, styled } from '@/styles/stitches.config';
import { useCallback, useMemo, useRef } from 'react';

import { Flex } from '@/components/primitive/Flex';
import { Text } from '@/components/primitive/Text';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import dayjs from 'dayjs';
import { deepCopy2DArray } from 'common/utils/copy';
import { useTheme } from 'next-themes';

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

  const startRow = useRef<number>(0);
  const startCol = useRef<number>(0);
  const selectMode = useRef<number>(0);
  const startTimeTable = useRef<number[][]>([]);

  const readOnly = useMemo(() => {
    return !handleTimetableChange;
  }, [handleTimetableChange]);

  const dates = useMemo(() => {
    const dates = [];
    for (let date = dayjs(startDate); date.isBefore(dayjs(endDate)); date = date.add(1, 'day')) {
      dates.push(date);
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { row, col } = e.currentTarget.dataset;

      if (!handleTimetableChange) return;
      if (!row || !col) return;

      const newTimeTable = deepCopy2DArray(timetable);
      startTimeTable.current = deepCopy2DArray(timetable);

      if (!!startTimeTable.current[Number(row)][Number(col)]) {
        newTimeTable[Number(row)][Number(col)] = 0;
        selectMode.current = 0;
      } else {
        newTimeTable[Number(row)][Number(col)] = 1;
        selectMode.current = 1;
      }

      startRow.current = Number(row);
      startCol.current = Number(col);

      handleTimetableChange(newTimeTable);
    },
    [handleTimetableChange, timetable]
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { row, col } = e.currentTarget.dataset;

      if (!handleTimetableChange) return;
      if (e.buttons !== 1) return;
      if (!row || !col) return;
      if (startTimeTable.current.length === 0) return;

      const newTimeTable = deepCopy2DArray(timetable);

      const startRowNum = Math.min(startRow.current, Number(row));
      const startColNum = Math.min(startCol.current, Number(col));

      const endRowNum = Math.max(startRow.current, Number(row));
      const endColNum = Math.max(startCol.current, Number(col));

      for (let i = 0; i < newTimeTable.length; i++) {
        for (let j = 0; j < newTimeTable[0].length; j++) {
          if (i < startRowNum || i > endRowNum || j < startColNum || j > endColNum) {
            newTimeTable[i][j] = startTimeTable.current[i][j];
            continue;
          }
          newTimeTable[i][j] = selectMode.current;
        }
      }

      handleTimetableChange(newTimeTable);
    },
    [handleTimetableChange, timetable]
  );

  const getTimetableBorders = useCallback((row: number, column: number) => {
    const borderTop: CellType['borderTop'] = row === 0 ? 'solidGray' : 'none';
    const borderLeft: CellType['borderLeft'] = column === 0 ? 'solidGray' : 'none';
    const borderRight: CellType['borderRight'] = 'solidGray';
    const borderBottom: CellType['borderBottom'] = row % 2 !== 0 ? 'solidGray' : 'dashedGray';
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

      return value ? `rgba(88, 184, 238, ${(0.8 * value) / participantsNumber})` : '$panel';
    },
    [participantsNumber, resolvedTheme, selectedTimetablePartition]
  );

  return (
    <TimetableWrapper direction="column" isFull>
      {!isSimple ? (
        <DateRow gap={4} isFull>
          <BlankCell />
          <Flex isFull>
            {dates.map((date, index) => (
              <DateCell key={index} align="center" justify="center" direction="column">
                <Text size="sm" color="gray400" content={date.format('MM/DD')} />
                <Text
                  size="sm"
                  color="gray400"
                  content={'일월화수목금토'.charAt(date.get('day'))}
                  weight="bold"
                />
              </DateCell>
            ))}
          </Flex>
        </DateRow>
      ) : null}

      {timetable.map((row, rowIndex) => (
        <Flex key={rowIndex} gap={3} isFull>
          {!isSimple ? (
            <BlankCell align="start" justify="end">
              {rowIndex % 2 === 0 && (
                <Text color="gray400" size="sm" content={times[rowIndex / 2] + ':00'} />
              )}
            </BlankCell>
          ) : null}

          <Flex isFull>
            {row.map((col, colIndex) => (
              <Flex key={colIndex} direction="column" isFull>
                <Cell
                  cellHeight={cellHeight}
                  data-row={rowIndex}
                  data-col={colIndex}
                  borderTop={getTimetableBorders(rowIndex, colIndex).borderTop}
                  borderLeft={getTimetableBorders(rowIndex, colIndex).borderLeft}
                  borderRight={getTimetableBorders(rowIndex, colIndex).borderRight}
                  borderBottom={getTimetableBorders(rowIndex, colIndex).borderBottom}
                  onMouseDown={!readOnly ? handleMouseDown : undefined}
                  onMouseOver={!readOnly ? handleMouseOver : undefined}
                  css={{
                    bgColor: getTimetableBackground(rowIndex, colIndex, col),
                  }}
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </TimetableWrapper>
  );
}

const TimetableWrapper = styled(Flex, {
  userSelect: 'none',
});

const DateRow = styled(Flex, {
  w: '$100',
  mb: '$3',
});

const DateCell = styled(Flex, {
  flex: 1,
});

const BlankCell = styled(Flex, {
  w: '$10',
  flexShrink: 0,
});

const Cell = styled('div', {
  display: 'flex',
  flex: 1,

  variants: {
    cellHeight: {
      sm: { minH: '$10' },
      md: {
        minH: '$25',
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
