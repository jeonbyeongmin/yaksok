import {
  isMouseEvent,
  isTouchEvent,
} from '@/hooks/use-drag-select-table/guards';

function convertIndexToString(rowIndex: number, colIndex: number) {
  return `${rowIndex}-${colIndex}`;
}

function convertStringToIndex(indexString: string) {
  if (!indexString.includes('-')) {
    throw new Error('indexString must be in the format of "rowIndex-colIndex"');
  }

  return indexString.split('-').map(Number);
}

function getClientXYFromEvent(e: Event) {
  let clientX: number | null = null;
  let clientY: number | null = null;

  if (isTouchEvent(e) && e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }

  if (isMouseEvent(e)) {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return { clientX, clientY };
}

function getTableCellElementFromPoint(
  x: number,
  y: number,
): HTMLTableCellElement | null {
  const element = document.elementFromPoint(x, y);
  if (element instanceof HTMLTableCellElement && element.tagName === 'TD') {
    return element;
  }
  return null;
}

function getTableCellIndex(e: Event) {
  let rowIndex: number | null = null;
  let colIndex: number | null = null;

  const { clientX, clientY } = getClientXYFromEvent(e);

  if (!clientX || !clientY) {
    return null;
  }

  const target = getTableCellElementFromPoint(clientX, clientY);

  if (!target) {
    return null;
  }

  if (target.parentNode instanceof HTMLTableRowElement) {
    const tr = target.parentNode;

    rowIndex = tr.sectionRowIndex;

    const tds = tr.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
      if (tds[i] === target) {
        colIndex = i;
        break;
      }
    }
  }

  if (rowIndex === null || colIndex === null) {
    return null;
  }

  return { rowIndex, colIndex };
}

export { getTableCellIndex, convertIndexToString, convertStringToIndex };
