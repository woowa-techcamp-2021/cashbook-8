import app from './app';
import dotenv from './config/dotenv';

const port = parseInt(dotenv.PORT);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
