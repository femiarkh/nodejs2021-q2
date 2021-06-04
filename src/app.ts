import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loggingMiddleware from './middlewares/loggingMiddleware';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(loggingMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.all('*', (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'fail',
    message: `Sorry, can't find ${req.originalUrl}`,
  })
);

module.exports = app;
