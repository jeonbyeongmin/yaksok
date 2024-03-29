export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToOmit: K[] = []
) {
  const clone: Record<string, unknown> = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key as string];
    }
  }
  return clone as Omit<T, K>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(object: T, keysToPick: K[]) {
  const result = {} as { [P in K]: T[P] };
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}
