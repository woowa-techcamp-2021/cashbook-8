const isNone = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
};

export default isNone;
