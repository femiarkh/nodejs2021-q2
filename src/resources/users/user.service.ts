import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
// import User, { InitialUser } from './user.model';
import { getRepository } from 'typeorm';
import User from './user.entity';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    // const users = (await usersRepo.getAll()) as User[];
    // res.status(StatusCodes.OK).json(users.map(User.toResponse));
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
    // const newUserData: InitialUser = { name, login, password };
    const user = new User();
    user.name = name;
    user.login = login;
    user.password = password;
    await getRepository(User).save(user);
    // const newUser = await usersRepo.save(new User(newUserData));
    // res.status(StatusCodes.CREATED).json(User.toResponse(newUser));
    res.status(StatusCodes.CREATED).json({
      id: user.id.toString(),
      name: user.name,
      login: user.login,
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    // const updatedUser = (await usersRepo.update(id, req.body)) as User;
    // res.status(StatusCodes.OK).json(User.toResponse(updatedUser));
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
    const userRepo = getRepository(User);
    // await usersRepo.remove(id);
    await userRepo.delete(id);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
