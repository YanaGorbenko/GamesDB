import express from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './db/connectDb.js';
import 'dotenv/config';
import gamesRouter from './routers/GamesRouter.js';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/games', gamesRouter);

app.use(notFoundHandler);

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
