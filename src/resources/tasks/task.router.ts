import express, { Request, Response } from 'express';
import Task from './task.model';
import tasksService from './task.service';
import * as routerHandlers from '../../utils/routerHandlers';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetAll(
      req,
      res,
      tasksService,
      Task,
      req.params['boardId'] as string
    );
  })
  .post(async (req: Request, res: Response) => {
    routerHandlers.handlePost(
      req,
      res,
      tasksService,
      Task,
      req.params['boardId'] as string
    );
  });

router
  .route('/:taskId')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetById(
      req,
      res,
      tasksService,
      Task,
      req.params['taskId'] as string
    );
  })
  .put(async (req: Request, res: Response) => {
    routerHandlers.handlePut(
      req,
      res,
      tasksService,
      Task,
      req.params['taskId'] as string
    );
  })
  .delete(async (req: Request, res: Response) => {
    routerHandlers.handleDelete(
      req,
      res,
      tasksService,
      req.params['taskId'] as string
    );
  });

export default router;
