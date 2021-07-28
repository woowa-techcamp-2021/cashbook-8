import app from './app';
import dotenv from './config/dotenv';
import MySQLDatabase from './database';

const database = new MySQLDatabase();
database.connect()
  .then(() => {
    console.log('database connected');

    const port = parseInt(dotenv.PORT);

    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  });
