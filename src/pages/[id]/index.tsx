import { Box, Flex, Text } from '@chakra-ui/react';
import { ReadEventPath, ReadEventReturn } from '@/api/events/read-event';
import { useEffect, useMemo, useState } from 'react';

import Layout from '@/components/Layout';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function Event() {
  const router = useRouter();
  const eventID = useMemo(() => router.query.id as string, [router.query]);

  const { data } = useSWR<ReadEventReturn>(
    eventID ? ReadEventPath({ eventID }) : null
  );

  const [selected, setSelected] = useState<boolean[][]>([]);

  const dates = useMemo(() => {
    if (!data) return [];

    const { startDate, endDate } = data.data;
    const dates = [];

    for (
      let date = dayjs(startDate);
      date.isBefore(dayjs(endDate));
      date = date.add(1, 'day')
    ) {
      dates.push(date);
    }

    return dates;
  }, [data]);

  const times = useMemo(() => {
    if (!data) return [];

    const { startTime, endTime } = data.data;
    const times = [];

    for (let time = startTime; time <= endTime; time++) {
      times.push(time);
    }

    return times;
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const { startDate, endDate, startTime, endTime } = data.data;

    const rowLength = endTime - startTime + 1;
    const colLength = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;

    const newSelected = Array.from(Array(rowLength * 2), () =>
      new Array(colLength).fill(false)
    );

    setSelected(newSelected);
  }, [data]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { row, col } = e.currentTarget.dataset;

    const newSelected = [...selected];

    newSelected[Number(row)][Number(col)] =
      !newSelected[Number(row)][Number(col)];

    setSelected(newSelected);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const { row, col } = e.currentTarget.dataset;

    if (e.buttons !== 1) return;

    const newSelected = [...selected];

    newSelected[Number(row)][Number(col)] =
      !newSelected[Number(row)][Number(col)];

    setSelected(newSelected);
  };

  return (
    <Layout>
      <Flex flexDir="column" userSelect="none">
        {selected.map((row, rowIndex) => (
          <Flex key={rowIndex} gap={4}>
            <Flex w="100px" h="30px" align="start" justify="end">
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
                    borderBottom={
                      rowIndex % 2 !== 0 ? '1px solid' : '1px dashed'
                    }
                    borderColor="#DBDBDB"
                    onMouseDown={handleMouseDown}
                    onMouseOver={handleMouseOver}
                    bgColor={col ? 'rgba(88, 184, 238, 0.2)' : 'white'}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Layout>
  );
}

export default Event;
