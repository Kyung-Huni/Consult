// backend/src/index.ts

// Global dependencies
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { prisma } from './prisma';
import cors from 'cors';
import dotenv from 'dotenv';

// Middlewares
import { errorHandler } from './middlewares/errorsHandler';

// Routers
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import studentsRouter from './routes/students';
import checklistRouter from './routes/checklist';
import meetingRouter from './routes/meetings';
import conversationRouter from './routes/conversations';
import collegeListRouter from './routes/collegeList';
import noteRouter from './routes/notes';
import examRouter from './routes/exams';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Server is running');
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send({ status: 'ok', db: 'connected' });
  } catch (e) {
    res.status(500).send({ status: 'error', db: 'failed' });
  }
});

// Router
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/students/:id/checklist', checklistRouter);
app.use('/students/:id/meetings', meetingRouter);
app.use('/students/:id/conversations', conversationRouter);
app.use('/students/:id/colleges', collegeListRouter);
app.use('/students/:id/notes', noteRouter);
app.use('/students/:id/exams', examRouter);

// Error handling
app.use(
  errorHandler as (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
