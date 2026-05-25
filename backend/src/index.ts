import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { initSocket } from './socket/index';
import { startGenerationWorker } from './workers/generation';
import assignmentsRouter from './routes/assignments';

const app = express();
const httpServer = http.createServer(app);

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/assignments', assignmentsRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

async function bootstrap() {
  await connectDatabase();
  initSocket(httpServer);
  startGenerationWorker();

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
