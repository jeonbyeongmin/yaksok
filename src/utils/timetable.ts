import type { Event } from 'common/interfaces/Event.interface';
import type { Participant } from 'common/interfaces/Participant.interface';

import dayjs from 'dayjs';

export function convertTableToIndexStrings(table: boolean[][]) {
  const array: string[] = [];

  table.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column) {
        array.push(`${rowIndex}-${columnIndex}`);
      }
    });
  });

  return array;
}

export function generateTimetable({
  event,
  participants,
}: {
  event: Event;
  participants: Participant[] | Participant | undefined;
}) {
  const { startDate, endDate, startTime, endTime } = event;
  const timetable: number[][] = Array.from(Array((endTime - startTime + 1) * 2), () =>
    new Array(dayjs(endDate).diff(dayjs(startDate), 'day') + 1).fill(0),
  );

  if (participants) {
    if (Array.isArray(participants)) {
      participants.forEach((participant) => {
        participant.availableIndexes.forEach((availableIndex) => {
          const [rowIndex, colIndex] = availableIndex.split('-').map(Number);
          timetable[rowIndex][colIndex] += 1;
        });
      });
    } else {
      participants.availableIndexes.forEach((availableIndex) => {
        const [rowIndex, colIndex] = availableIndex.split('-').map(Number);
        timetable[rowIndex][colIndex] += 1;
      });
    }
  }

  return timetable;
}

export function convertNumberTableToBooleanTable(table: number[][]) {
  return table.map((row) => row.map((column) => column > 0));
}
