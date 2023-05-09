import { isTouchEvent } from '@/hooks/use-drag-select-table/guards';

function getTargetIndexFromEvent(e: Event) {
  let target;

  if (isTouchEvent(e) && e.touches) {
    const { clientX, clientY } = e.touches[0];
    target = document.elementFromPoint(clientX, clientY) as HTMLElement;
  } else {
    target = e.target as HTMLElement;
  }

  if (target && target.dataset && target.dataset.index) {
    return target.dataset.index;
  }

  return null;
}

export { getTargetIndexFromEvent };
