export const toRadian = (degree: number): number => {
  return Math.PI / 180 * degree;
};

export const toDegree = (radian: number): number => {
  return radian * (180 / Math.PI);
};

export const calcDegreeWithLines = (width: number, height: number): number => {
  const z = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  const degree = toDegree(Math.acos(width / z));
  if (height > 0) {
    return 360 - degree;
  }

  return degree;
};
