export const isSameDate = (dateA: Date, dateB: Date): boolean => {
  return dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();
};

export const getDayString = (day: number): string => {
  if (day > 6 || day < 0) {
    return '';
  }
  const dayString = ['일', '월', '화', '수', '목', '금', '토', '일'];
  return dayString[day];
};

export const date2yyyyMMdd = (Date: Date): string => {
  const y = Date.getFullYear();
  const m = Date.getMonth() + 1;
  const d = Date.getDate();
  const month = m < 10 ? '0' + m : m;
  const date = d < 10 ? '0' + d : d;

  return `${y}${month}${date}`;
};

export const date2DatePickerFormat = (Date: Date): string => {
  const y = Date.getFullYear();
  const m = Date.getMonth() + 1;
  const d = Date.getDate();
  const month = m < 10 ? '0' + m : m;
  const date = d < 10 ? '0' + d : d;

  return `${y}-${month}-${date}`;
};
