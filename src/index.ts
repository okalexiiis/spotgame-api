import 'dotenv/config';
import app from './app';
import { closePrisma } from './lib/prisma';

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received, shutting down...`);
  server.close(async () => {
    try {
      await closePrisma();
      process.exit(0);
    } catch (err) {
      console.error('Shutdown error:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
