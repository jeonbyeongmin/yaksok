import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { BsCalendarEvent } from 'react-icons/bs';
import Layout from '@/components/Layout';
import TimeTable from '@/components/TimeTable';
import dayjs from 'dayjs';
import { useEvent } from '@/hooks/useEvent';
import { useRouter } from 'next/router';

function Event() {
  const router = useRouter();
  const eventID = useMemo(() => router.query.id as string, [router.query]);

  const { event } = useEvent({ eventID });
  const [timeTable, setTimeTable] = useState<boolean[][]>([]);

  useEffect(() => {
    if (!event) return;

    const { startDate, endDate, startTime, endTime } = event;
    const newTimeTable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(false)
    );

    setTimeTable(newTimeTable);
  }, [event]);

  const handleTimeTableChange = (timeTable: boolean[][]) => {
    setTimeTable(timeTable);
  };

  return (
    <Layout>
      <Flex w="full" py={20} align="center" justify="center">
        <Flex w="50rem" alignItems="center" flexDirection="column" gap={10}>
          <Flex w="full" align="center" justify="space-between">
            <Flex alignItems="center" gap={2}>
              <BsCalendarEvent size={24} />
              <Text fontSize="2xl">{event?.title}</Text>
            </Flex>

            <Button
              borderRadius="full"
              size="md"
              bgColor="primary"
              color="white"
            >
              완료하기
            </Button>
          </Flex>
          <TimeTable
            startDate={event?.startDate ?? new Date()}
            endDate={event?.endDate ?? new Date()}
            startTime={event?.startTime ?? 0}
            endTime={event?.endTime ?? 0}
            timeTable={timeTable}
            handleTimeTableChange={handleTimeTableChange}
          />
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Event;
