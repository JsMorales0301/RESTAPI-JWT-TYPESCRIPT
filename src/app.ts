import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';

const app: Application = express();
const PORT: number = 3000;

// settings
app.set('port', PORT);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

export default app;