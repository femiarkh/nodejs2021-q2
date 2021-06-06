import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import User, { InitialUser } from './user.model';
import * as usersRepo from './user.memory.repository';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const users = (await usersRepo.getAll()) as User[];
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = (await usersRepo.get(id)) as User;
    res.status(StatusCodes.OK).json(User.toResponse(result));
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
    const newUserData: InitialUser = { name, login, password };
    const newUser = await usersRepo.save(new User(newUserData));
    res.status(StatusCodes.CREATED).json(User.toResponse(newUser));
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const updatedUser = (await usersRepo.update(id, req.body)) as User;
    res.status(StatusCodes.OK).json(User.toResponse(updatedUser));
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    await usersRepo.remove(id);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
