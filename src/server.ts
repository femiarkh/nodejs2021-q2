import * as logging from './utils/logging';

const { PORT } = require('./common/config');
const app = require('./app');

const server = app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// Uncomment to test handling unhandled rejections
// (async function testUnhandledRejection() {
//   throw new Error('BAM!');
// })();

process.on('unhandledRejection', (err: Error) => {
  logging.unhandledRejection(err);
  server.close(() => {
    process.exit(1);
  });
});
