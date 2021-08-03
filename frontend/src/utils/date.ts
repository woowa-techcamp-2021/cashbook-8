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
