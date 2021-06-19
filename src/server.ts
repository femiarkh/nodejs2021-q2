import * as logging from './utils/logging';
import 'reflect-metadata';

process.on('uncaughtException', (err: Error) => {
  logging.uncaughtException(err);
  process.exit(1);
});

// Uncomment following lines to test handling uncaught exceptions
// (function testUncaughtExceptions() {
//   throw new Error('BAM!');
// })();

const { PORT } = require('./common/config');
const app = require('./app');

const server = app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('unhandledRejection', (err: Error) => {
  logging.unhandledRejection(err);
  server.close(() => {
    process.exit(1);
  });
});

// Uncomment following lines to test handling unhandled rejections
// (async function testUnhandledRejections() {
//   throw new Error('BAM!');
// })();
