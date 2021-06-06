import { Request, Response } from 'express';
import User, { InitialUser } from './user.model';
import * as usersRepo from './user.memory.repository';

export default {
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = (await usersRepo.getAll()) as User[];
      res.json(users.map(User.toResponse));
    } catch (err) {
      console.log(err);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const id = req.params['id'] as string;
      const result = (await usersRepo.get(id)) as User | '404';
      if (result === '404') {
        res.status(404).send(null);
      } else {
        res.status(200).send(User.toResponse(result));
      }
    } catch (err) {
      console.log(err);
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const newUserData: InitialUser = req.body;
      const newUser = await usersRepo.save(new User(newUserData));
      res.status(201).send(User.toResponse(newUser));
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params['id'] as string;
      const result = (await usersRepo.update(id, req.body)) as User | '404';
      if (result === '404') {
        res.status(404).send(null);
      } else {
        res.status(200).send(User.toResponse(result));
      }
    } catch (err) {
      console.log(err);
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const id = req.params['id'] as string;
      const result = await usersRepo.remove(id);
      if (result === '404') {
        res.status(404).send(null);
      } else {
        res.status(204).send(null);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
