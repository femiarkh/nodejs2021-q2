import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

const errorController = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err instanceof AppError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  const status = err instanceof AppError ? err.status : 'error';
  const { message } = err;

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorController;
