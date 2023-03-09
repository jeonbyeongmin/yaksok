import dayjs from 'dayjs';

export const convertIndexToTime = (index: number, startTime: number) => {
  const hour = Math.floor((startTime + index / 2) % 24);
  const minute = index % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
};

type ConvertIndexToDateOption = {
  isShort?: boolean;
};

export const convertIndexToDate = (
  index: number,
  startDate: Date,
  option?: ConvertIndexToDateOption
) => {
  const date = dayjs(startDate).add(index, 'day');
  const { isShort } = option || {};

  const convertedDate = isShort ? date.format('MM.DD') : date.format('YY.MM.DD');
  return `${convertedDate} (${'일월화수목금토'.charAt(date.get('day'))})`;
};

export const convertDateToString = (date: Date) => {
  const dayDate = dayjs(date);
  const convertedDate = dayDate.format('YY.MM.DD');
  return `${convertedDate} (${'일월화수목금토'.charAt(dayDate.get('day'))})`;
};

export const convertTimeToString = (time: number) => {
  const hour = Math.floor(time % 24);
  const minute = time % 1 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
};
