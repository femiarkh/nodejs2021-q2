import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import Task from './task.model';
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
    const result = (await tasksRepo.get(taskId)) as Task;
    res.status(StatusCodes.OK).json(result);
  }),

  save: catchAsync(async (req: Request, res: Response) => {
    const paramsBoardId = req.params['boardId'] as string;

    const newTask = await tasksRepo.save(paramsBoardId, new Task(req.body));
    res.status(StatusCodes.CREATED).json(newTask);
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const result = (await tasksRepo.update(taskId, req.body)) as Task;
    res.status(StatusCodes.OK).json(result);
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    await tasksRepo.remove(taskId);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
