import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from './user.entity';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';
import Task from '../tasks/task.entity';

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
    const saltRounds = 10;
    const user = new User();
    await bcrypt.hash(password, saltRounds, async (_err, hash) => {
      user.name = name;
      user.login = login;
      user.password = hash;
      await getRepository(User).save(user);
      res.status(StatusCodes.CREATED).json({
        id: user.id.toString(),
        name: user.name,
        login: user.login,
        password: user.password,
      });
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
    await getRepository(Task)
      .createQueryBuilder()
      .update()
      .set({ userId: null })
      .where('user_id = :id', { id })
      .execute();
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
