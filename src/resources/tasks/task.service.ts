import { Request, Response } from 'express';

import Task, { InitialTask } from './task.model';
import * as tasksRepo from './task.memory.repository';
import catchAsync from '../../utils/catchAsync';

export default {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const tasks = await tasksRepo.getAll(boardId);
    res.json(tasks);
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = (await tasksRepo.get(taskId)) as Task | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  }),

  save: catchAsync(async (req: Request, res: Response) => {
    const {
      title,
      order,
      description,
      boardId,
      userId,
      columnId,
    }: InitialTask = req.body;

    const paramsBoardId = req.params['boardId'] as string;

    const newTaskData = {
      title,
      order,
      description,
      boardId,
      userId,
      columnId,
    };
    const newTask = await tasksRepo.save(paramsBoardId, new Task(newTaskData));
    res.status(201).send(newTask);
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = (await tasksRepo.update(taskId, req.body)) as Task | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = await tasksRepo.remove(taskId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  }),
};
