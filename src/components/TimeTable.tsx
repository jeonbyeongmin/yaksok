import { VariantProps, styled } from '@/styles/stitches.config';
import { useCallback, useMemo, useRef } from 'react';

import { Flex } from '@/components/primitive/Flex';
import { Text } from '@/components/primitive/Text';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import dayjs from 'dayjs';
import { deepCopy2DArray } from 'common/utils/copy';

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

  const timetablePallet = useCallback(
    (row: number, column: number) => {
      let borderTop: CellType['borderTop'] = row === 0 ? 'solidGray' : 'none';
      let borderLeft: CellType['borderLeft'] = column === 0 ? 'solidGray' : 'none';
      let borderRight: CellType['borderRight'] = 'solidGray';
      let borderBottom: CellType['borderBottom'] = row % 2 !== 0 ? 'solidGray' : 'dashedGray';

      if (!selectedTimetablePartition) return { borderTop, borderLeft, borderRight, borderBottom };

      if (
        selectedTimetablePartition.startRow === row &&
        selectedTimetablePartition.col === column
      ) {
        borderTop = 'solidDarken';
      }
      if (selectedTimetablePartition.endRow === row && selectedTimetablePartition.col === column) {
        borderBottom = 'solidDarken';
      }
      if (
        selectedTimetablePartition.startRow <= row &&
        selectedTimetablePartition.endRow >= row &&
        selectedTimetablePartition.col === column
      ) {
        borderLeft = 'solidDarken';
        borderRight = 'solidDarken';
      }

      return { borderTop, borderLeft, borderRight, borderBottom };
    },
    [selectedTimetablePartition]
  );

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

  return (
    <TimetableWrapper direction="column" isFull>
      {!isSimple ? (
        <DateRow gap={4} isFull>
          <BlankCell cellHeight={cellHeight} />
          <Flex isFull>
            {dates.map((date, index) => (
              <DateCell key={index} align="center" justify="center" direction="column">
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
      ) : null}

      {timetable.map((row, rowIndex) => (
        <Flex key={rowIndex} gap={6} isFull>
          {!isSimple ? (
            <BlankCell align="start" justify="end" cellHeight={cellHeight}>
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
                  borderTop={timetablePallet(rowIndex, colIndex).borderTop}
                  borderLeft={timetablePallet(rowIndex, colIndex).borderLeft}
                  borderRight={timetablePallet(rowIndex, colIndex).borderRight}
                  borderBottom={timetablePallet(rowIndex, colIndex).borderBottom}
                  onMouseDown={!readOnly ? handleMouseDown : undefined}
                  onMouseOver={!readOnly ? handleMouseOver : undefined}
                  css={{
                    bgColor:
                      selectedTimetablePartition &&
                      selectedTimetablePartition.startRow <= rowIndex &&
                      selectedTimetablePartition.endRow >= rowIndex &&
                      selectedTimetablePartition.col === colIndex
                        ? '$darken200'
                        : col
                        ? `rgba(88, 184, 238, ${(0.5 * col) / participantsNumber})`
                        : 'transparent',
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
  w: '$25',
  minH: '$14',
  flexShrink: 0,

  variants: {
    cellHeight: {
      sm: { minH: '$10' },
      md: { minH: '$14' },
      lg: { minH: '$16' },
    },
  },
  defaultVariants: {
    cellHeight: 'md',
  },
});

const Cell = styled('div', {
  display: 'flex',
  flex: 1,

  variants: {
    cellHeight: {
      sm: { minH: '$10' },
      md: { minH: '$18' },
      lg: { minH: '$16' },
    },

    borderTop: {
      solidGray: { borderTop: '1px solid $gray200' },
      solidDarken: { borderTop: '2px solid $darken200' },
      none: { borderTop: '0px' },
    },
    borderLeft: {
      solidGray: { borderLeft: '1px solid $gray200' },
      solidDarken: { borderLeft: '2px solid $darken200' },
      none: { borderLeft: '0px' },
    },
    borderRight: {
      solidGray: { borderRight: '1px solid $gray200' },
      solidDarken: { borderRight: '2px solid $darken200' },
      none: { borderRight: '0px' },
    },
    borderBottom: {
      solidGray: { borderBottom: '1px solid $gray200' },
      solidDarken: { borderBottom: '2px solid $darken200' },
      dashedGray: { borderBottom: '1px dashed $gray200' },
    },
  },
  defaultVariants: {
    cellHeight: 'md',
  },
});

export default Timetable;
