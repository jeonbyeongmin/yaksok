import { useCallback, useEffect, useRef, useState } from 'react';

import {
  isMouseEvent,
  isTouchEvent,
} from '@/hooks/use-drag-select-table/guards';
import {
  convertIndexToString,
  convertStringToIndex,
  getTableCellIndex,
} from '@/hooks/use-drag-select-table/utils';

function useDragSelectTable(
  initialTable?: boolean[][],
): [React.RefObject<HTMLTableElement>, boolean[][]] {
  const startIndex = useRef<string>('');
  const currentIndex = useRef<string>('');
  const table = useRef<boolean[][]>([]);
  const mode = useRef<boolean>(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const [tableValue, setTableValue] = useState<boolean[][]>(initialTable ?? []);

  const handlePointerStart = useCallback(
    (e: Event) => {
      if (isTouchEvent(e)) {
        e.preventDefault();
      }

      const index = getTableCellIndex(e);

      if (index === null) {
        return;
      }

      const { rowIndex, colIndex } = index;

      table.current = [...tableValue];
      startIndex.current = convertIndexToString(rowIndex, colIndex);

      const newTableValues = [...tableValue];
      mode.current = !newTableValues[rowIndex][colIndex];
      newTableValues[rowIndex][colIndex] = mode.current;

      setTableValue(newTableValues);
    },
    [tableValue],
  );

  const handlePointerMove = useCallback(
    (e: Event) => {
      if (isMouseEvent(e) && e.buttons !== 1) {
        return;
      }

      const index = getTableCellIndex(e);

      if (index === null) {
        return;
      }

      const { rowIndex, colIndex } = index;

      const indexString = convertIndexToString(rowIndex, colIndex);
      const isSameAsPrevIndex = indexString === currentIndex.current;

      if (isSameAsPrevIndex) {
        return;
      }

      currentIndex.current = indexString;

      const [startRowIndex, startColIndex] = convertStringToIndex(
        startIndex.current,
      );
      const [minRow, maxRow] = [startRowIndex, rowIndex].sort((a, b) => a - b);
      const [minCol, maxCol] = [startColIndex, colIndex].sort((a, b) => a - b);

      const newTableValues = tableValue.map((row) => row.slice());
      newTableValues.forEach((r, i) => {
        r.forEach((_, j) => {
          if (i < minRow || i > maxRow || j < minCol || j > maxCol) {
            newTableValues[i][j] = table.current[i][j];
          } else {
            newTableValues[i][j] = mode.current;
          }
        });
      });

      setTableValue(newTableValues);
    },
    [tableValue],
  );

  const handlePointerEnd = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const node = tableRef.current?.querySelector('tbody') ?? tableRef.current;

  useEffect(() => {
    if (!initialTable && node) {
      const trs = node.querySelectorAll('tr');
      const newTableValues: boolean[][] = [];
      trs.forEach((tr, i) => {
        const tds = tr.querySelectorAll('td');
        const row: boolean[] = [];
        tds.forEach((td, j) => {
          row.push(false);
        });

        if (tds.length > 0) {
          newTableValues.push(row);
        }
      });

      setTableValue(newTableValues);
    }
  }, [initialTable, node]);

  useEffect(() => {
    if (node) {
      node.addEventListener('touchstart', handlePointerStart);
      node.addEventListener('mousedown', handlePointerStart);
      node.addEventListener('touchmove', handlePointerMove);
      node.addEventListener('touchend', handlePointerEnd);
      node.addEventListener('mouseover', handlePointerMove);
      return () => {
        node.removeEventListener('touchstart', handlePointerStart);
        node.removeEventListener('mousedown', handlePointerStart);
        node.removeEventListener('touchmove', handlePointerMove);
        node.removeEventListener('touchend', handlePointerEnd);
        node.removeEventListener('mouseover', handlePointerMove);
      };
    }
  }, [handlePointerStart, handlePointerMove, handlePointerEnd, node]);

  return [tableRef, tableValue];
}

export { useDragSelectTable };
