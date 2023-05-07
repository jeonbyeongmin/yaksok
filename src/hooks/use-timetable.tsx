import React from 'react';

interface UseTimeTableProps {}

export type UseTimeTableReturn = ReturnType<typeof useTimeTable>;

export function useTimeTable({}: UseTimeTableProps) {
  const [timetable, setTimetable] = React.useState<boolean[][]>([]);

  const handleTimetableChange = React.useCallback((timetable: boolean[][]) => {
    setTimetable(timetable);
  }, []);

  return {
    timetable,
    handleTimetableChange,
  };
}
