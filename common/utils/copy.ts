export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepCopy2DArray<T>(arr: T[][]): T[][] {
  return arr.map((row) => row.slice());
}
