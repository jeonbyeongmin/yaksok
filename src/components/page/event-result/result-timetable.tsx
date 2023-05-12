import { Table, TBody, TD, TR } from '@/components/primitive/table';
import { TimetablePartition } from '@/types/timetable.type';

interface Props {
  participantsLength: number;
  timetable: number[][];
  selectedPartition?: TimetablePartition;
}

export function ResultTimetable({
  participantsLength,
  timetable,
  selectedPartition,
}: Props) {
  return (
    <Table>
      <TBody>
        {timetable.map((row, rowIndex) => (
          <TR key={rowIndex}>
            {row.map((_, columnIndex) => (
              <TD
                key={columnIndex}
                isEven={rowIndex % 2 === 0}
                css={{
                  'h': '$10',
                  '@bp1': { h: '$16' },
                  'bgColor': isIndexInPartition(rowIndex, columnIndex, selectedPartition)
                    ? '$darken100'
                    : `rgba(88, 184, 238, ${
                        timetable[rowIndex][columnIndex] / participantsLength
                      })`,
                }}
              />
            ))}
          </TR>
        ))}
      </TBody>
    </Table>
  );
}

const isIndexInPartition = (
  rowIndex: number,
  columnIndex: number,
  selectedPartition?: TimetablePartition,
) => {
  if (selectedPartition) {
    const { startRow, endRow, col } = selectedPartition;

    if (rowIndex >= startRow && rowIndex <= endRow && columnIndex === col) {
      return true;
    }
  }

  return false;
};
