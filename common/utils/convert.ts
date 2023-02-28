import dayjs from 'dayjs';

export const convertIndexToTime = (index: number, startTime: number) => {
  const hour = Math.floor((startTime + index / 2) % 24);
  const minute = index % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
};

export const convertIndexToDate = (index: number, startDate: Date) => {
  const date = dayjs(startDate).add(index, 'day');
  return `${date.format('MM/DD')} (${'일월화수목금토'.charAt(date.get('day'))})`;
};
