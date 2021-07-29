const isNumber = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return true;
  }

  return false;
};

export default isNumber;
