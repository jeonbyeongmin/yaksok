import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo, useRef } from 'react';

import dayjs from 'dayjs';
import { deepCopy2DArray } from '@/utils/copy';

interface TimeTableProps {
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
  timeTable: number[][];
  handleTimeTableChange?: (timeTable: number[][]) => void;
}

function TimeTable({
  startDate,
  endDate,
  startTime,
  endTime,
  timeTable,
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
      if (!handleTimeTableChange) return;

      const { row, col } = e.currentTarget.dataset;
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
      if (!handleTimeTableChange) return;

      const { row, col } = e.currentTarget.dataset;

      if (e.buttons !== 1) return;

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
    <Flex flexDir="column" userSelect="none">
      <Flex gap={4} mb={3}>
        <Flex w="30px" />
        <Flex>
          {dates.map((date, index) => (
            <Flex
              key={index}
              w="100px"
              align="center"
              justify="center"
              flexDir="column"
            >
              <Text fontSize="sm" color="#A8A8A8">
                {date.format('MM/DD')}
              </Text>
              <Text fontSize="md" color="#A8A8A8">
                {date.format('ddd')}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      {timeTable.map((row, rowIndex) => (
        <Flex key={rowIndex} gap={4}>
          <Flex w="30px" h="30px" align="start" justify="end">
            <Text hidden={rowIndex % 2 !== 0} color="#A8A8A8" fontSize="sm">
              {times[rowIndex / 2] + ':00'}
            </Text>
          </Flex>
          <Flex>
            {row.map((col, colIndex) => (
              <Flex key={colIndex} flexDir="column">
                <Box
                  data-row={rowIndex}
                  data-col={colIndex}
                  w="100px"
                  h="30px"
                  borderTop={rowIndex === 0 ? '1px' : '0px'}
                  borderLeft={colIndex === 0 ? '1px' : '0px'}
                  borderRight="1px"
                  borderBottom={rowIndex % 2 !== 0 ? '1px solid' : '1px dashed'}
                  borderColor="#DBDBDB"
                  onMouseDown={!readOnly ? handleMouseDown : undefined}
                  onMouseOver={!readOnly ? handleMouseOver : undefined}
                  bgColor={col ? 'rgba(88, 184, 238, 0.2)' : 'white'}
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default TimeTable;
