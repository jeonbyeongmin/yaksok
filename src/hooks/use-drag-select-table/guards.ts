function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

function isTouchEvent(event: Event): event is TouchEvent {
  return event instanceof TouchEvent;
}

export { isMouseEvent, isTouchEvent };
