import express, { Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    const users = (await usersService.getAll()) as User[];
    res.json(users.map(User.toResponse));
  })
  .post(async (req: Request, res: Response) => {
    const newUser = await usersService.save(req.body);
    res.status(201).send(User.toResponse(newUser));
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = (await usersService.get(id)) as User | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(User.toResponse(result));
    }
  })
  .put(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = (await usersService.update(id, req.body)) as User | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(User.toResponse(result));
    }
  })
  .delete(async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    const result = await usersService.remove(id);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

export default router;
