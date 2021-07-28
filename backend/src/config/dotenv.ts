import 'dotenv/config';

const loadEnv = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 정의 되지 않음`);
  }

  return value;
};

export default {
  PORT: loadEnv('PORT')
};
