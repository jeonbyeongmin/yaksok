export function rotate2DArray<T>(arr: T[][]): T[][] {
  const result = arr
    .map((_, i) => arr.map((col) => col[i]).filter((col) => col !== undefined))
    .filter((row) => row.length > 0);
  return result;
}
