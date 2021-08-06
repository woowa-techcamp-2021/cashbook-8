import { isNumberString } from 'class-validator';

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const yyyyMMdd2Date = (yyyyMMdd: string): Date => {
  const year = yyyyMMdd.slice(0, 4);
  const month = yyyyMMdd.slice(4, 6);
  const date = yyyyMMdd.slice(6, 8);

  if (!(isNumberString(year) && isNumberString(month) && isNumberString(date))) {
    throw new Error(`${yyyyMMdd} 은 yyyyMMdd 양식에 맞지 않습니다`);
  }

  return new Date(Number(year), Number(month) - 1, Number(date));
};
