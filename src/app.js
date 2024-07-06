import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import errorHandler from './middlewares/errorHandler.js';
import authorsRouter from './routers/authorsRouter.js';
import coursesRouter from './routers/coursesRouter.js';
import usersRouter from './routers/usersRouter.js';

const uri = process.env.DB_HOST;

const app = express();

const connection = mongoose.connect(uri);
connection
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/authors', authorsRouter);

app.use((_, res) => res.status(404).json({ message: 'Route not found' }));

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
