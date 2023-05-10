import type { Event } from 'common/inerfaces/Event.interface';
import type { Participant } from 'common/inerfaces/Participant.interface';

import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef } from 'react';

interface Params {
  event: Event;
  participants: Participant[] | Participant;
}

function useTimetable({ event, participants }: Params) {
  const timetable = useRef<number[][]>([]);

  const boolTimetable = useMemo(() => {
    return timetable.current.map((row) => row.map((value) => !!value));
  }, []);

  const setTimetable = useCallback((participants: Participant[]) => {
    participants.forEach((participant) => {
      participant.availableIndexes.forEach((availableIndex) => {
        const [rowIndex, colIndex] = availableIndex.split('-').map(Number);
        timetable.current[rowIndex][colIndex] += 1;
      });
    });
  }, []);

  useEffect(() => {
    const { startDate, endDate, startTime, endTime } = event;
    timetable.current = Array.from(Array((endTime - startTime + 1) * 2), () =>
      new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0),
    );

    if (Array.isArray(participants)) {
      setTimetable(participants);
    } else {
      setTimetable([participants]);
    }
  }, [event, participants, setTimetable]);

  // const participantsByCell = useMemo(() => {
  //   if (!participants || !Array.isArray(participants)) return {};

  //   const map: { [key: string]: string[] } = {};
  //   participants.forEach((participant) => {
  //     participant.availableIndexes.forEach((index) => {
  //       map[index] = map[index]
  //         ? [...map[index], participant._id]
  //         : [participant._id];
  //     });
  //   });
  //   return map;
  // }, [participants]);

  // const partitionsInfo = useMemo(() => {
  //   if (!participants || !Array.isArray(participants)) return [];

  //   const sortedParticipantsByCell = Object.entries(participantsByCell).sort(
  //     (a, b) => {
  //       const [aRow, aCol] = a[0].split('-').map(Number);
  //       const [bRow, bCol] = b[0].split('-').map(Number);
  //       return aCol === bCol ? aRow - bRow : aCol - bCol;
  //     },
  //   );

  //   const partitions: TimetablePartition[] = [];

  //   let startRow = 0;
  //   let endRow = 0;
  //   let col = 0;
  //   let tempParticipants: string[] = [];

  //   sortedParticipantsByCell.forEach(([index, participantIDs]) => {
  //     const [currentRow, currentCol] = index.split('-').map(Number);

  //     const isSameColumn = currentCol === col;
  //     const isConsecutiveRow = currentRow === endRow + 1;
  //     const isSameParticipants =
  //       tempParticipants.length === participantIDs.length &&
  //       tempParticipants.every((v, i) => v === participantIDs[i]);

  //     if (isSameColumn && isConsecutiveRow && isSameParticipants) {
  //       endRow = currentRow;
  //       return;
  //     }

  //     if (tempParticipants.length > 0) {
  //       partitions.push({
  //         id: `${startRow}-${endRow}-${col}`,
  //         col,
  //         startRow,
  //         endRow,
  //         participantIDs: tempParticipants,
  //       });
  //       tempParticipants = [];
  //     }

  //     startRow = currentRow;
  //     endRow = currentRow;
  //     col = currentCol;
  //     tempParticipants.push(...participantIDs);
  //   });

  //   if (tempParticipants.length > 0) {
  //     partitions.push({
  //       id: `${startRow}-${endRow}-${col}`,
  //       col,
  //       startRow,
  //       endRow,
  //       participantIDs: tempParticipants,
  //     });
  //   }

  //   return partitions;
  // }, [participantsByCell, participants]);

  // const partitionGroups = useMemo(() => {
  //   if (!partitionsInfo) return [];

  //   partitionsInfo.sort((a, b) => {
  //     if (a.endRow - a.startRow > b.endRow - b.startRow) return -1;
  //     if (a.endRow - a.startRow < b.endRow - b.startRow) return 1;
  //     return 0;
  //   });

  //   const splittedByParticipantsLength = partitionsInfo.reduce<
  //     TimetablePartition[][]
  //   >((acc, partition) => {
  //     const index = partition.participantIDs.length - 1;
  //     if (acc[index]) {
  //       acc[index].push(partition);
  //     } else {
  //       acc[index] = [partition];
  //     }
  //     return acc;
  //   }, []);

  //   return splittedByParticipantsLength.reverse();
  // }, [partitionsInfo]);

  return {
    timetable,
    boolTimetable,
  };
}

export { useTimetable };
