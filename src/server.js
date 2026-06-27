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

const PORT = process.env.PORT || 3000;

const app = express();

// ✅ Упрощенная настройка CORS (без функции)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://react-final-project-silk-three.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins, // ✅ Просто массив
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }),
);

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

// ✅ Подключаем БД и запускаем сервер правильно
try {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

export default app;
