import { VariantProps, darkTheme, styled } from '@/styles/stitches.config';
import { useCallback, useMemo, useRef } from 'react';

import { Flex } from '@/components/primitive/Flex';
import { Text } from '@/components/primitive/Text';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import dayjs from 'dayjs';
import { deepCopy2DArray } from 'common/utils/copy';
import { isMobile } from 'common/utils/detect';
import { useTheme } from 'next-themes';

type CellType = VariantProps<typeof Cell>;

type TouchEventMapType = {
  [key: string]: (e: React.TouchEvent<HTMLDivElement>) => void;
};

type MouseEventMapType = {
  [key: string]: (e: React.MouseEvent<HTMLDivElement>) => void;
};

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
  const moveFlag = useRef<boolean>(false);

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

  const handleTouchStart = useCallback(() => {
    moveFlag.current = false;
  }, []);

  const handleTouchMove = useCallback(() => {
    moveFlag.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (moveFlag.current) return;

      const { dataset } = e.target as HTMLDivElement;
      const row = Number(dataset.row);
      const col = Number(dataset.col);

      if (!handleTimetableChange || Number.isNaN(row) || Number.isNaN(col)) return;

      const newTimeTable = [...timetable];
      newTimeTable[row][col] = newTimeTable[row][col] ? 0 : 1;

      handleTimetableChange(newTimeTable);
      e.preventDefault();
    },
    [handleTimetableChange, timetable]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!handleTimetableChange) return;

      const { dataset } = e.target as HTMLDivElement;
      const row = Number(dataset.row);
      const col = Number(dataset.col);

      if (Number.isNaN(row) || Number.isNaN(col)) return;

      const newTimeTable = [...timetable];
      startTimeTable.current = [...timetable];
      selectMode.current = newTimeTable[row][col] ? 0 : 1;
      newTimeTable[row][col] = selectMode.current;
      startRow.current = row;
      startCol.current = col;

      handleTimetableChange(newTimeTable);
    },
    [handleTimetableChange, timetable]
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { dataset } = e.target as HTMLDivElement;

      if (!handleTimetableChange || e.buttons !== 1) return;

      const row = Number(dataset.row);
      const col = Number(dataset.col);

      if (Number.isNaN(row) || Number.isNaN(col) || startTimeTable.current.length === 0) return;

      const newTimeTable = deepCopy2DArray(timetable);
      const [startRowNum, endRowNum] = [startRow.current, row].sort((a, b) => a - b);
      const [startColNum, endColNum] = [startCol.current, col].sort((a, b) => a - b);

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

  const handleMouseUp = useCallback(() => {
    startTimeTable.current = [];
  }, []);

  const mouseEventMap: MouseEventMapType = {
    mousedown: handleMouseDown,
    mouseover: handleMouseOver,
    mouseup: handleMouseUp,
  };

  const touchEventMap: TouchEventMapType = {
    touchstart: handleTouchStart,
    touchmove: handleTouchMove,
    touchend: handleTouchEnd,
  };

  const handleEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (readOnly) return;
    const eventType = e.type;
    if (isMobile()) {
      const event = e as React.TouchEvent<HTMLDivElement>;
      touchEventMap[eventType](event);
    } else {
      const event = e as React.MouseEvent<HTMLDivElement>;
      mouseEventMap[eventType](event);
    }
  };

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
        <Table key={rowIndex} gap={3} isFull>
          {!isSimple ? (
            <BlankCell align="start" justify="end">
              {rowIndex % 2 === 0 && (
                <Text color="gray400" size="sm" content={`${times[rowIndex / 2]}시`} />
              )}
            </BlankCell>
          ) : null}

          <Flex
            isFull
            onTouchStart={handleEvent}
            onTouchMove={handleEvent}
            onTouchEnd={handleEvent}
            onMouseDown={handleEvent}
            onMouseOver={handleEvent}
            onMouseUp={handleEvent}>
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
                  css={{
                    bgColor: getTimetableBackground(rowIndex, colIndex, col),
                    transition: 'all 0.1s ease',
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
  w: '$10',
  '@bp1': { w: '$15' },
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
