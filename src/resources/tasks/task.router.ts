import express, { Request, Response } from 'express';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks);
  })
  .post(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const newTask = await tasksService.save(boardId, req.body);
    res.status(201).send(newTask);
  });

router
  .route('/:taskId')
  .get(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = (await tasksService.get(taskId)) as Task | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  })
  .put(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = (await tasksService.update(taskId, req.body)) as
      | Task
      | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  })
  .delete(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = await tasksService.remove(taskId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

export default router;
