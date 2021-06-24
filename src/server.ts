import { Connection, createConnection, getConnection } from 'typeorm';
import 'reflect-metadata';
import { Server } from 'http';
import * as logging from './utils/logging';
import app from './app';
import createAdmin from './utils/createAdmin';

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
  const connectToDB = async (): Promise<Connection | void> => {
    let connection;
    try {
      if (!connection) {
        connection = await createConnection();
      } else {
        connection = getConnection();
      }
      console.log('Successfully connected to DB');
      return connection;
    } catch (err) {
      await new Promise((res) => setTimeout(() => res(null), 5000));
      return connectToDB();
    }
  };
  const connection = (await connectToDB()) as Connection;
  await connection.runMigrations();
  await createAdmin();

  server = app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
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
