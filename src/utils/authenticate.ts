import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import AppError from './errors/AppError';
import User from '../resources/users/user.entity';
import catchAsync from './errors/catchAsync';

const authenticate = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        'You are not properly authorized to make this request',
        StatusCodes.UNAUTHORIZED
      );
    }
    const token = authHeader.slice(7);
    try {
      const { userId, login } = jwt.verify(
        token,
        process.env['SECRET'] as string
      ) as jwt.JwtPayload;
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { id: userId, login } });
      if (!user) {
        throw Error;
      }
      next();
    } catch (err) {
      throw new AppError('Provided token is invalid', StatusCodes.UNAUTHORIZED);
    }
  }
);

export default authenticate;
