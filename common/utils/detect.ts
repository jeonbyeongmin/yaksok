export function isDesktopOS() {
  return (
    'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(
      navigator.platform.toLowerCase()
    ) >= 0
  );
}
