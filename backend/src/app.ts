import express from 'express';
import apiRouter from './routers';
import cors from 'cors';
import dotenv from './config/dotenv';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors({
  origin: dotenv.CLIENT_URL
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);

app.use(errorMiddleware);

export default app;
