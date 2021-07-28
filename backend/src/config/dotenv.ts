import 'dotenv/config';

const loadEnv = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 정의 되지 않음`);
  }

  return value;
};

export default {
  PORT: loadEnv('PORT'),

  MYSQL_HOST: loadEnv('MYSQL_HOST'),
  MYSQL_PORT: loadEnv('MYSQL_PORT'),
  MYSQL_USERNAME: loadEnv('MYSQL_USERNAME'),
  MYSQL_PASSWORD: loadEnv('MYSQL_PASSWORD'),
  MYSQL_DATABASE: loadEnv('MYSQL_DATABASE'),
  MYSQL_SYNC: loadEnv('MYSQL_SYNC')
};
