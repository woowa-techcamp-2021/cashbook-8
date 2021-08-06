const isNumberString = (value: unknown): boolean => {
  if (isNaN(Number(value))) {
    return false;
  }

  return true;
};

export default isNumberString;
