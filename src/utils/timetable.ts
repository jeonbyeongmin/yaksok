function convertTableToIndexStrings(table: boolean[][]) {
  const array: string[] = [];

  table.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column) {
        array.push(`${rowIndex}-${columnIndex}`);
      }
    });
  });

  return array;
}

export { convertTableToIndexStrings };
