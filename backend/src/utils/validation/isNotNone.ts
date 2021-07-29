const isNotNone = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return false;
  }

  return true;
};

export default isNotNone;
