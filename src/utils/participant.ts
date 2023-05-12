import type { TimetablePartition } from '@/types/timetable.type';
import type { Participant } from 'common/interfaces/Participant.interface';

export function generatePartitionGroups(participants: Participant[]) {
  const participantsByCell: { [key: string]: string[] } = {};
  participants.forEach((participant) => {
    participant.availableIndexes.forEach((index) => {
      participantsByCell[index] = participantsByCell[index]
        ? [...participantsByCell[index], participant._id]
        : [participant._id];
    });
  });

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

  partitions.sort((a, b) => {
    if (a.endRow - a.startRow > b.endRow - b.startRow) return -1;
    if (a.endRow - a.startRow < b.endRow - b.startRow) return 1;
    return 0;
  });

  const splittedByParticipantsLength = partitions.reduce<TimetablePartition[][]>(
    (acc, partition) => {
      const index = partition.participantIDs.length - 1;
      if (acc[index]) {
        acc[index].push(partition);
      } else {
        acc[index] = [partition];
      }
      return acc;
    },
    [],
  );

  return splittedByParticipantsLength.reverse();
}
