import { useCallback, useMemo, useState } from 'react';

import { Event } from 'common/inerfaces/Event.interface';
import { Participant } from 'common/inerfaces/Participant.interface';
import { TimetablePartition } from 'common/inerfaces/TimetablePartition.interface';
import dayjs from 'dayjs';

export function useTimetable(
  event: Event | undefined,
  participants: Participant | Participant[] | undefined
) {
  const [timetable, setTimetable] = useState<number[][]>([]);

  const handleTimetableChange = useCallback((timeTable: number[][]) => {
    setTimetable(timeTable);
  }, []);

  const getPlainTimetable = useCallback(() => {
    if (!event) return null;
    const { startDate, endDate, startTime, endTime } = event;
    const timetable = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0)
    );
    return timetable;
  }, [event]);

  const paintTimetable = useCallback(
    (participants: Participant | Participant[]) => {
      const newTimeTable = getPlainTimetable();

      if (!newTimeTable) return [];

      const paintParticipant = (participant: Participant) => {
        participant.availableIndexes.forEach((index) => {
          const [rowIndex, colIndex] = index.split('-').map(Number);
          newTimeTable[rowIndex][colIndex] += 1;
        });
      };

      if (!Array.isArray(participants)) {
        paintParticipant(participants);
      } else {
        participants.forEach(paintParticipant);
      }

      return newTimeTable;
    },
    [getPlainTimetable]
  );

  const completeTimetable = useMemo(() => {
    if (!participants) return [];
    if (!Array.isArray(participants)) return paintTimetable([participants]);
    return paintTimetable(participants);
  }, [participants, paintTimetable]);

  const participantsByCell = useMemo(() => {
    if (!participants || !Array.isArray(participants)) return {};

    const map: { [key: string]: string[] } = {};
    participants.forEach((participant) => {
      participant.availableIndexes.forEach((index) => {
        map[index] = map[index] ? [...map[index], participant._id] : [participant._id];
      });
    });
    return map;
  }, [participants]);

  const partitionsInfo = useMemo(() => {
    if (!participants || !Array.isArray(participants)) return [];

    const sortedParticipantsByCell = Object.entries(participantsByCell).sort((a, b) => {
      const [aRow, aCol] = a[0].split('-').map(Number);
      const [bRow, bCol] = b[0].split('-').map(Number);
      return aCol === bCol ? aRow - bRow : aCol - bCol;
    });

    const partitions: TimetablePartition[] = [];

    let startRow = 0;
    let endRow = 0;
    let col = 0;
    let tempParticipants: string[] = [];

    sortedParticipantsByCell.forEach(([index, participantIDs]) => {
      const [currentRow, currentCol] = index.split('-').map(Number);

      const isSameColumn = currentCol === col;
      const isConsecutiveRow = currentRow === endRow + 1;
      const isSameParticipants =
        tempParticipants.length === participantIDs.length &&
        tempParticipants.every((v, i) => v === participantIDs[i]);

      if (isSameColumn && isConsecutiveRow && isSameParticipants) {
        endRow = currentRow;
        return;
      }

      if (tempParticipants.length > 0) {
        partitions.push({
          id: `${startRow}-${endRow}-${col}`,
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

    if (tempParticipants.length > 0) {
      partitions.push({
        id: `${startRow}-${endRow}-${col}`,
        col,
        startRow,
        endRow,
        participantIDs: tempParticipants,
      });
    }

    return partitions;
  }, [participantsByCell, participants]);

  const partitionGroups = useMemo(() => {
    if (!partitionsInfo) return [];

    partitionsInfo.sort((a, b) => {
      if (a.endRow - a.startRow > b.endRow - b.startRow) return -1;
      if (a.endRow - a.startRow < b.endRow - b.startRow) return 1;
      return 0;
    });

    const splittedByParticipantsLength = partitionsInfo.reduce<TimetablePartition[][]>(
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

    return splittedByParticipantsLength.reverse();
  }, [partitionsInfo]);

  return {
    timetable,
    getPlainTimetable,
    partitionsInfo,
    completeTimetable,
    partitionGroups,
    handleTimetableChange,
    paintTimetable,
  };
}
