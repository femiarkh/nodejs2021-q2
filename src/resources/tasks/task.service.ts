import { Request, Response } from 'express';
import Task, { InitialTask } from './task.model';
import * as tasksRepo from './task.memory.repository';

export default {
  getAll: async (req: Request, res: Response) => {
    try {
      const boardId = req.params['boardId'] as string;
      const tasks = await tasksRepo.getAll(boardId);
      res.json(tasks);
    } catch (err) {
      console.log(err);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const taskId = req.params['taskId'] as string;
      const result = (await tasksRepo.get(taskId)) as Task | '404';
      if (result === '404') {
        res.status(404).send(null);
      } else {
        res.status(200).send(result);
      }
    } catch (err) {
      console.log(err);
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const newTaskData: InitialTask = req.body;
      const boardId = req.params['boardId'] as string;
      const newTask = await tasksRepo.save(boardId, new Task(newTaskData));
      res.status(201).send(newTask);
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const taskId = req.params['taskId'] as string;
      const result = (await tasksRepo.update(taskId, req.body)) as Task | '404';
      if (result === '404') {
        res.status(404).send(null);
      } else {
        res.status(200).send(result);
      }
    } catch (err) {
      console.log(err);
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const taskId = req.params['taskId'] as string;
      const result = await tasksRepo.remove(taskId);
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
