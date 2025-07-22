// backend/src/index.ts

// Global dependencies
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { prisma } from './prisma';
import cors from 'cors';
import dotenv from 'dotenv';

// Middlewares
import { errorHandler } from './middlewares/errorsHandler';

// Router - Global
import usersRouter from './routes/users';
import authRouter from './routes/auth';

// Router - Dashboard
import dashboardRouter from './routes/dashboard';

// Router - Student
import studentsRouter from './routes/students';

// Router - StudentDetail
import checklistRouter from './routes/checklist';
import todolistRouter from './routes/todolist';
import meetingRouter from './routes/meeting';
import conversationRouter from './routes/conversations';
import collegeListRouter from './routes/collegeList';
import noteRouter from './routes/notes';
import examRouter from './routes/exams';
import timeLogRouter from './routes/timelog';
import contactInfoRouter from './routes/contactInfo';

// Router - College
import collegesRouter from './routes/colleges';

// Router - Calendar
import calendarRouter from './routes/calendar';

// Router - Meetings
import meetingsRouter from './routes/meetings';

// Router - Templates
import templateRouter from './routes/templates';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://consult-7ue12fhnj-leekyunghuns-projects.vercel.app/login',
    ],
    credentials: true,
  })
);

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

// Dashboard
app.use('/dashboard', dashboardRouter);

// Student Detail Page
app.use('/students', studentsRouter);
app.use('/students/:id/checklist', checklistRouter);
app.use('/students/:id/todo', todolistRouter);
app.use('/students/:id/meeting', meetingRouter);
app.use('/students/:id/conversations', conversationRouter);
app.use('/students/:id/colleges', collegeListRouter);
app.use('/students/:id/notes', noteRouter);
app.use('/students/:id/exams', examRouter);
app.use('/students/:id/timelogs', timeLogRouter);
app.use('/students/:id/contact-info', contactInfoRouter);

// CollegePage
app.use('/colleges', collegesRouter);

// Calendar
app.use('/calendar', calendarRouter);

// Meetings
app.use('/meetings', meetingsRouter);

// Templates
app.use('/templates', templateRouter);

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
