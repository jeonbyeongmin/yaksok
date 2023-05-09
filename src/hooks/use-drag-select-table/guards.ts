function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'ontouchstart' in window && event.type.startsWith('touch');
}

export { isMouseEvent, isTouchEvent };
