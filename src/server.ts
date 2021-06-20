import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { Server } from 'http';
import * as logging from './utils/logging';
import app from './app';

process.on('uncaughtException', (err: Error) => {
  logging.uncaughtException(err);
  process.exit(1);
});

// Uncomment following lines to test handling uncaught exceptions
// (function testUncaughtExceptions() {
//   throw new Error('BAM!');
// })();

const port = process.env['PORT'] || 4000;

let server: Server;

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  server = app.listen(port, () =>
    console.log(`App is running on http://localhost:${port}`)
  );
})();

process.on('unhandledRejection', (err: Error) => {
  logging.unhandledRejection(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Uncomment following lines to test handling unhandled rejections
// (async function testUnhandledRejections() {
//   throw new Error('BAM!');
// })();
