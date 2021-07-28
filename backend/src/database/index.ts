import path from 'path';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import dotenv from '../config/dotenv';

class MySQLDatabase {
  private options: ConnectionOptions;

  constructor () {
    this.options = {
      type: 'mysql',
      host: dotenv.MYSQL_HOST,
      port: parseInt(dotenv.MYSQL_PORT),
      username: dotenv.MYSQL_USERNAME,
      password: dotenv.MYSQL_PASSWORD,
      database: dotenv.MYSQL_DATABASE,
      entities: [
        path.join(__dirname, '../entities/*.ts')
      ],
      synchronize: true
    };
  }

  connect (): Promise<Connection> {
    return createConnection(this.options);
  }
}

export default MySQLDatabase;
