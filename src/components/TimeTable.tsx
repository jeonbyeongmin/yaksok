import { useCallback, useMemo, useRef } from 'react';

import { Flex } from '@/components/primitive/Flex';
import { Text } from '@/components/primitive/Text';
import dayjs from 'dayjs';
import { deepCopy2DArray } from '@/utils/copy';
import { styled } from '@/styles/stitches.config';

interface TimeTableProps {
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
  timeTable: number[][];
  participantsNumber?: number;
  handleTimeTableChange?: (timeTable: number[][]) => void;
}

function TimeTable({
  startDate,
  endDate,
  startTime,
  endTime,
  timeTable,
  participantsNumber = 1,
  handleTimeTableChange,
}: TimeTableProps) {
  const startRow = useRef<number>(0);
  const startCol = useRef<number>(0);
  const startTimeTable = useRef<number[][]>([]);

  const readOnly = useMemo(() => {
    return !handleTimeTableChange;
  }, [handleTimeTableChange]);

  const dates = useMemo(() => {
    const dates = [];

    for (
      let date = dayjs(startDate);
      date.isBefore(dayjs(endDate));
      date = date.add(1, 'day')
    ) {
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

      if (!handleTimeTableChange) return;
      if (!row || !col) return;

      const newTimeTable = deepCopy2DArray(timeTable);
      startTimeTable.current = deepCopy2DArray(timeTable);

      newTimeTable[Number(row)][Number(col)] = !!startTimeTable.current[
        Number(row)
      ][Number(col)]
        ? 0
        : 1;

      startRow.current = Number(row);
      startCol.current = Number(col);

      handleTimeTableChange(newTimeTable);
    },
    [handleTimeTableChange, timeTable]
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { row, col } = e.currentTarget.dataset;

      if (!handleTimeTableChange) return;
      if (e.buttons !== 1) return;
      if (!row || !col) return;
      if (startTimeTable.current.length === 0) return;

      const newTimeTable = deepCopy2DArray(timeTable);

      const startRowNum = Math.min(startRow.current, Number(row));
      const startColNum = Math.min(startCol.current, Number(col));

      const endRowNum = Math.max(startRow.current, Number(row));
      const endColNum = Math.max(startCol.current, Number(col));

      for (let i = startRowNum; i <= endRowNum; i++) {
        for (let j = startColNum; j <= endColNum; j++) {
          newTimeTable[i][j] = !!startTimeTable.current[i][j] ? 0 : 1;
        }
      }

      handleTimeTableChange(newTimeTable);
    },
    [handleTimeTableChange, timeTable]
  );

  return (
    <TimeTableWrapper direction="column">
      <DateRow gap={4}>
        <Cell size="sm" />
        <Flex>
          {dates.map((date, index) => (
            <DateCell
              key={index}
              align="center"
              justify="center"
              direction="column"
            >
              <Text size="sm" color="gray400" content={date.format('MM/DD')} />
              <Text
                size="md"
                color="gray400"
                content={'일월화수목금토'.charAt(date.get('day'))}
              />
            </DateCell>
          ))}
        </Flex>
      </DateRow>
      {timeTable.map((row, rowIndex) => (
        <Flex key={rowIndex} gap={6}>
          <Cell align="start" justify="end" size="sm">
            {rowIndex % 2 === 0 && (
              <Text
                color="gray400"
                size="sm"
                content={times[rowIndex / 2] + ':00'}
              />
            )}
          </Cell>
          <Flex>
            {row.map((col, colIndex) => (
              <Flex key={colIndex} direction="column">
                <Cell
                  data-row={rowIndex}
                  data-col={colIndex}
                  borderTop={rowIndex === 0}
                  borderLeft={colIndex === 0}
                  borderRight={true}
                  borderBottom={rowIndex % 2 !== 0}
                  onMouseDown={!readOnly ? handleMouseDown : undefined}
                  onMouseOver={!readOnly ? handleMouseOver : undefined}
                  css={{
                    bgColor: col
                      ? `rgba(88, 184, 238, ${
                          (0.4 * col) / participantsNumber
                        })`
                      : 'white',
                  }}
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </TimeTableWrapper>
  );
}

const TimeTableWrapper = styled(Flex, {
  userSelect: 'none',
});

const DateRow = styled(Flex, {
  w: '$100',
  mb: '$3',
});

const DateCell = styled(Flex, {
  w: '$45',
});

const Cell = styled(Flex, {
  w: '$45',
  h: '$14',
  flexShrink: 0,

  variants: {
    size: {
      sm: {
        w: '$25',
      },
    },
    borderTop: {
      true: { borderTop: '1px solid $gray200' },
      false: { borderTop: '0px' },
    },
    borderLeft: {
      true: { borderLeft: '1px solid $gray200' },
      false: { borderLeft: '0px' },
    },
    borderRight: {
      true: { borderRight: '1px solid $gray200' },
      false: { borderRight: '0px' },
    },
    borderBottom: {
      true: { borderBottom: '1px solid $gray200' },
      false: { borderBottom: '1px dashed $gray200' },
    },
  },
});

export default TimeTable;
