import { useCallback, useMemo, useState } from 'react';

import { Event } from 'common/inerfaces/Event.interface';
import { Participant } from 'common/inerfaces/Participant.interface';
import dayjs from 'dayjs';
import { rotate2DArray } from 'common/utils/array';

type TimetablePartition = {
  col: number;
  startRow: number;
  endRow: number;
  numberOfParticipants: number;
  participantIDs: string[];
};

export function useTimetable(
  event?: Event,
  participants?: Participant | Participant[]
) {
  const [timetable, setTimetable] = useState<number[][]>([]);

  const handleTimetableChange = useCallback((timeTable: number[][]) => {
    setTimetable(timeTable);
  }, []);

  const getPlainTimetable = useCallback(() => {
    if (!event) return [];
    const { startDate, endDate, startTime, endTime } = event;
    const timetable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0)
    );
    return timetable;
  }, [event]);

  const paintTimetable = useCallback(
    (participants: Participant | Participant[]) => {
      const timeTable = getPlainTimetable();

      if (!Array.isArray(participants)) {
        participants.availableIndexes.forEach((index) => {
          const [rowIndex, colIndex] = index.split('-').map((v) => Number(v));
          timeTable[rowIndex][colIndex] += 1;
        });
        return timeTable;
      }

      participants.forEach((participant) => {
        participant.availableIndexes.forEach((index) => {
          const [rowIndex, colIndex] = index.split('-').map((v) => Number(v));
          timeTable[rowIndex][colIndex] += 1;
        });
      });
      return timeTable;
    },
    [getPlainTimetable]
  );

  const completeTimetable = useMemo(() => {
    if (!participants) return [];
    if (!Array.isArray(participants)) return paintTimetable([participants]);
    return paintTimetable(participants);
  }, [participants, paintTimetable]);

  const timetablePartitions = useMemo<TimetablePartition[]>(() => {
    if (!Array.isArray(completeTimetable)) return [];

    const rotatedTimeTable = rotate2DArray(completeTimetable);
    const newTimeTablePartitions: TimetablePartition[] = [];

    rotatedTimeTable.forEach((col, colIndex) => {
      let startRow = 0;
      let endRow = 0;
      let isStart = false;
      let startingNumber = 0;

      col.forEach((row, rowIndex) => {
        if (row !== 0 && !isStart) {
          startRow = rowIndex;
          startingNumber = row;
          isStart = true;
          return;
        }
        if (row === 0 && isStart) {
          endRow = rowIndex - 1;
          newTimeTablePartitions.push({
            col: colIndex,
            startRow,
            endRow,
            numberOfParticipants: startingNumber,
            participantIDs: [],
          });
          isStart = false;
          return;
        }
        if (row !== startingNumber && isStart) {
          endRow = rowIndex - 1;
          newTimeTablePartitions.push({
            col: colIndex,
            startRow,
            endRow,
            numberOfParticipants: startingNumber,
            participantIDs: [],
          });
          startRow = rowIndex;
          startingNumber = row;
          return;
        }
        if (rowIndex === col.length - 1 && isStart) {
          endRow = rowIndex;
          newTimeTablePartitions.push({
            col: colIndex,
            startRow,
            endRow,
            numberOfParticipants: startingNumber,
            participantIDs: [],
          });
          return;
        }
      });
    });

    return newTimeTablePartitions;
  }, [completeTimetable]);

  return {
    timetable,
    getPlainTimetable,
    completeTimetable,
    timetablePartitions,
    handleTimetableChange,
    paintTimetable,
  };
}
