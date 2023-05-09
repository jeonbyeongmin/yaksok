import { useCallback, useEffect, useRef, useState } from 'react';

import { isMouseEvent } from '@/hooks/use-drag-select-table/guards';
import { getTargetIndexFromEvent } from '@/hooks/use-drag-select-table/utils';

function useDragSelectTable(): [
  React.RefObject<HTMLTableElement>,
  boolean[][],
] {
  const startIndex = useRef<string>('');
  const currentIndex = useRef<string>('');
  const table = useRef<boolean[][]>([]);
  const mode = useRef<boolean>(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const [tableValues, setTableValues] = useState<boolean[][]>([]);

  const node = tableRef.current?.querySelector('tbody') ?? tableRef.current;

  const startDrag = useCallback(
    (e: Event) => {
      const index = getTargetIndexFromEvent(e);

      if (!index) {
        return;
      }

      table.current = [...tableValues];
      startIndex.current = index;

      const [row, col] = index.split('-').map(Number);

      const newTableValues = [...tableValues];
      mode.current = !newTableValues[row][col];
      newTableValues[row][col] = mode.current;

      setTableValues(newTableValues);
    },
    [tableValues],
  );

  const handleTouchStart = useCallback(
    (e: Event) => {
      startDrag(e);
      e.preventDefault();
    },
    [startDrag],
  );

  const handleMouseDown = useCallback(
    (e: Event) => {
      startDrag(e);
    },
    [startDrag],
  );

  const handlePoinertMove = useCallback(
    (e: Event) => {
      if (isMouseEvent(e) && e.buttons !== 1) {
        return;
      }

      const index = getTargetIndexFromEvent(e);
      const isSameIndex = index === currentIndex.current;

      if (!index || isSameIndex) {
        return;
      }

      currentIndex.current = index;

      const [startRow, startCol] = startIndex.current.split('-').map(Number);
      const [row, col] = index.split('-').map(Number);
      const [minRow, maxRow] = [startRow, row].sort((a, b) => a - b);
      const [minCol, maxCol] = [startCol, col].sort((a, b) => a - b);

      const newTableValues = tableValues.map((row) => row.slice());
      newTableValues.forEach((r, i) => {
        r.forEach((_, j) => {
          if (i < minRow || i > maxRow || j < minCol || j > maxCol) {
            newTableValues[i][j] = table.current[i][j];
          } else {
            newTableValues[i][j] = mode.current;
          }
        });
      });

      setTableValues(newTableValues);
    },
    [tableValues],
  );

  const handleTouchEnd = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (node) {
      const trs = node.querySelectorAll('tr');
      const newTableValues: boolean[][] = [];
      trs.forEach((tr, i) => {
        const tds = tr.querySelectorAll('td');
        const row: boolean[] = [];
        tds.forEach((td, j) => {
          row.push(false);
          td.dataset.index = `${i}-${j}`;
        });
        newTableValues.push(row);
      });

      setTableValues(newTableValues);
    }
  }, [node]);

  useEffect(() => {
    if (node) {
      node.addEventListener('touchstart', handleTouchStart);
      node.addEventListener('mousedown', handleMouseDown);
      node.addEventListener('touchmove', handlePoinertMove);
      node.addEventListener('touchend', handleTouchEnd);
      node.addEventListener('mouseover', handlePoinertMove);
      return () => {
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('mousedown', handleMouseDown);
        node.removeEventListener('touchmove', handlePoinertMove);
        node.removeEventListener('touchend', handleTouchEnd);
        node.removeEventListener('mouseover', handlePoinertMove);
      };
    }
  }, [
    handleMouseDown,
    handleTouchStart,
    handlePoinertMove,
    handleTouchEnd,
    node,
  ]);

  return [tableRef, tableValues];
}

export { useDragSelectTable };
