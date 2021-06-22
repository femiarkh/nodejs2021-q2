import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../../utils/errors/AppError';
import catchAsync from '../../utils/errors/catchAsync';
import User from '../users/user.entity';

export default {
  login: catchAsync(async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ where: { login } });
    if (!user) {
      throw new AppError(
        'User with provided login is not found',
        StatusCodes.NOT_FOUND
      );
    }
    bcrypt.compare(password, user?.password, (err, isMatch) => {
      if (err) {
        throw new AppError(
          'Something went wrong',
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      if (isMatch) {
        const token = jwt.sign(
          { userId: user.id, login: user.login },
          process.env['SECRET'] as string
        );
        res.status(StatusCodes.OK).json({ token });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'fail', message: 'Provided password is incorrect' });
      }
    });
  }),
};
