import express from 'express';
import apiRouter from './routers';
import cors from 'cors';
import dotenv from './config/dotenv';
import errorMiddleware from './middlewares/error.middleware';
import * as path from 'path';

const app = express();

app.use(cors({
  origin: dotenv.CLIENT_URL
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../../frontend/dist')));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')));

app.use('/api', apiRouter);

app.use((_, res) => res.status(404).redirect('/'));

app.use(errorMiddleware);

export default app;
