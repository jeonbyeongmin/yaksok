import { useDragSelectTable } from '@/hooks/use-drag-select-table';
import { styled } from '@stitches/react';

export function Table() {
  const [ref, value] = useDragSelectTable();

  const getStatus = (row: number, col: number) => {
    if (value.length === 0) return false;
    return value[row][col];
  };

  return (
    <StyledTable ref={ref}>
      <thead>
        <tr>
          <th>Event</th>
          <th>Location</th>
          <th>Time</th>
          <th>etc1</th>
          <th>etc2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <StyledTableData status={getStatus(0, 0)}>Event 1</StyledTableData>
          <StyledTableData status={getStatus(0, 1)}>Location 1</StyledTableData>
          <StyledTableData status={getStatus(0, 2)}>Time 1</StyledTableData>
          <StyledTableData status={getStatus(0, 3)}>etc1</StyledTableData>
          <StyledTableData status={getStatus(0, 4)}>etc2</StyledTableData>
        </tr>
        <tr>
          <StyledTableData status={getStatus(1, 0)}>Event 2</StyledTableData>
          <StyledTableData status={getStatus(1, 1)}>Location 2</StyledTableData>
          <StyledTableData status={getStatus(1, 2)}>Time 2</StyledTableData>
          <StyledTableData status={getStatus(1, 3)}>etc1</StyledTableData>
          <StyledTableData status={getStatus(1, 4)}>etc2</StyledTableData>
        </tr>
        <tr>
          <StyledTableData status={getStatus(2, 0)}>Event 3</StyledTableData>
          <StyledTableData status={getStatus(2, 1)}>Location 3</StyledTableData>
          <StyledTableData status={getStatus(2, 2)}>Time 3</StyledTableData>
          <StyledTableData status={getStatus(2, 3)}>etc1</StyledTableData>
          <StyledTableData status={getStatus(2, 4)}>etc2</StyledTableData>
        </tr>
        <tr>
          <StyledTableData status={getStatus(3, 0)}>Event 4</StyledTableData>
          <StyledTableData status={getStatus(3, 1)}>Location 4</StyledTableData>
          <StyledTableData status={getStatus(3, 2)}>Time 4</StyledTableData>
          <StyledTableData status={getStatus(3, 3)}>etc1</StyledTableData>
          <StyledTableData status={getStatus(3, 4)}>etc2</StyledTableData>
        </tr>
        <tr>
          <StyledTableData status={getStatus(4, 0)}>Event 5</StyledTableData>
          <StyledTableData status={getStatus(4, 1)}>Location 5</StyledTableData>
          <StyledTableData status={getStatus(4, 2)}>Time 5</StyledTableData>
          <StyledTableData status={getStatus(4, 3)}>etc1</StyledTableData>
          <StyledTableData status={getStatus(4, 4)}>etc2</StyledTableData>
        </tr>
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled('table', {
  'borderCollapse': 'collapse',
  'borderSpacing': 0,
  'width': '100%',
  'maxWidth': '100%',
  'overflow': 'hidden',
  'borderRadius': '0.375rem',
  'boxShadow': '0 0 0 1px rgba(0, 0, 0, 0.05)',
  'backgroundColor': '#fff',
  'color': '#111',
  'userSelect': 'none',

  '& th, & td': {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
});

const StyledTableData = styled('td', {
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },

  'variants': {
    status: {
      true: {
        'backgroundColor': '#1e40af',
        'color': 'white',

        '&:hover': {
          backgroundColor: '#1e40af',
        },
      },
    },
  },
});
