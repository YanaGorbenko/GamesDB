import express from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './db/connectDB.js';
import 'dotenv/config';
import gamesRouter from './routers/GamesRouter.js';
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import selectedRouter from './routers/selectedGamesRouter.js';
import ideasRouter from './routers/ideasRouter.js';
import userRouter from './routers/usersRouter.js';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/games', gamesRouter);
app.use('/selected', selectedRouter);
app.use('/ideas', ideasRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
await connectDb();

app.listen(PORT, error => {
  if (error) {
    console.log('Error with server starting!');
    return;
  }
  console.log(`Server in running at port ${PORT}`);
});

export default app;
