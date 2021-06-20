import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import User from './user.entity';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    res.status(StatusCodes.OK).json(
      users.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        login: user.login,
      }))
    );
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'User is not found',
      });
    } else {
      res.status(StatusCodes.OK).json({
        id: user.id.toString(),
        name: user.name,
        login: user.login,
      });
    }
  }),

  save: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, login, password } = req.body;
    if (!name || !login || !password) {
      return next(
        new AppError(
          'Request body should include the following: name, login, password.',
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const user = new User();
    user.name = name;
    user.login = login;
    user.password = password;
    await getRepository(User).save(user);
    res.status(StatusCodes.CREATED).json({
      id: user.id.toString(),
      name: user.name,
      login: user.login,
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const userRepo = getRepository(User);
    const { name, login, password } = req.body;
    await userRepo.update(id, { name, login, password });
    const updatedUser = await userRepo.findOne(id);
    if (!updatedUser) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'User is not found',
      });
    } else {
      res.status(StatusCodes.OK).json({
        id: updatedUser.id.toString(),
        name: updatedUser.name,
        login: updatedUser.login,
      });
    }
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    await getRepository(User).delete(id);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
