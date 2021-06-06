import { Request, Response } from 'express';
import User, { InitialUser } from './user.model';
import * as usersRepo from './user.memory.repository';
import catchAsync from '../../utils/catchAsync';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const users = (await usersRepo.getAll()) as User[];
    res.json(users.map(User.toResponse));
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = (await usersRepo.get(id)) as User | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(User.toResponse(result));
    }
  }),

  save: catchAsync(async (req: Request, res: Response) => {
    const newUserData: InitialUser = req.body;
    const newUser = await usersRepo.save(new User(newUserData));
    res.status(201).send(User.toResponse(newUser));
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = (await usersRepo.update(id, req.body)) as User | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(User.toResponse(result));
    }
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = await usersRepo.remove(id);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  }),
};
