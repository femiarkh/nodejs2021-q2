import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes } from 'http-status-codes';
import loginRouter from './resources/login/login.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import * as logging from './utils/logging';
import AppError from './utils/errors/AppError';
import errorController from './utils/errors/error.controller';
import authenticate from './utils/authenticate';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(logging.middleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', authenticate, userRouter);
app.use('/boards', authenticate, boardRouter);
boardRouter.use('/:boardId/tasks', authenticate, taskRouter);

app.all('*', (req, _res, next) => {
  next(
    new AppError(`Sorry, can't find ${req.originalUrl}`, StatusCodes.NOT_FOUND)
  );
});

app.use(errorController);

export default app;
