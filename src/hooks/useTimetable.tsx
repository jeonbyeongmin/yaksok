import { useCallback, useMemo, useState } from 'react';

import { Event } from 'common/inerfaces/Event.interface';
import { Participant } from 'common/inerfaces/Participant.interface';
import dayjs from 'dayjs';

type TimetablePartition = {
  col: number;
  startRow: number;
  endRow: number;
  participantIDs: string[];
};

export function useTimetable(
  event: Event | undefined,
  participants: Participant | Participant[] | undefined
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

  const participantsByCell = useMemo(() => {
    if (!participants) return {};
    if (!Array.isArray(participants)) return {};

    const map: { [key: string]: string[] } = {};
    participants.forEach((participant) => {
      participant.availableIndexes.forEach((index) => {
        if (map[index]) {
          map[index].push(participant._id);
        } else {
          map[index] = [participant._id];
        }
      });
    });
    return map;
  }, [participants]);

  const partitionsInfo = useMemo(() => {
    if (!participants) return null;
    if (!Array.isArray(participants)) return null;

    const participantsByCellArr = Object.entries(participantsByCell).sort((a, b) => {
      const [aRow, aCol] = a[0].split('-').map((v) => Number(v));
      const [bRow, bCol] = b[0].split('-').map((v) => Number(v));
      return aCol === bCol ? aRow - bRow : aCol - bCol;
    });

    const partitions: TimetablePartition[] = [];

    let startRow = 0;
    let endRow = 0;
    let col = 0;
    let tempParticipants: string[] = [];

    participantsByCellArr.forEach(([index, participantIDs]) => {
      const [currentRow, currentCol] = index.split('-').map((v) => Number(v));

      if (
        currentCol === col &&
        currentRow === endRow + 1 &&
        tempParticipants.length === participantIDs.length &&
        tempParticipants.every((v, i) => v === participantIDs[i])
      ) {
        endRow = currentRow;
        return;
      }

      if (tempParticipants.length > 0) {
        partitions.push({
          col,
          startRow,
          endRow,
          participantIDs: tempParticipants,
        });
        tempParticipants = [];
      }

      startRow = currentRow;
      endRow = currentRow;
      col = currentCol;
      tempParticipants.push(...participantIDs);
    });

    return partitions;
  }, [participantsByCell, participants]);

  const partitionByRank = useMemo(() => {
    partitionsInfo?.sort((a, b) => {
      if (a.endRow - a.startRow > b.endRow - b.startRow) return -1;
      if (a.endRow - a.startRow < b.endRow - b.startRow) return 1;
      return 0;
    });

    const splittedByParticipantsLength = partitionsInfo?.reduce<TimetablePartition[][]>(
      (acc, partition) => {
        const index = partition.participantIDs.length - 1;
        if (acc[index]) {
          acc[index].push(partition);
        } else {
          acc[index] = [partition];
        }
        return acc;
      },
      []
    );

    return splittedByParticipantsLength?.reverse();
  }, [partitionsInfo]);

  return {
    timetable,
    getPlainTimetable,
    partitionsInfo,
    completeTimetable,
    partitionByRank,
    handleTimetableChange,
    paintTimetable,
  };
}
