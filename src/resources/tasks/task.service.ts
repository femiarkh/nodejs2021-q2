import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import catchAsync from '../../utils/errors/catchAsync';
import Task from './task.entity';
import AppError from '../../utils/errors/AppError';

export default {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const boardTasks = await getRepository(Task).find({ where: { boardId } });
    res.json(
      boardTasks.map((task) => ({
        id: task.id.toString(),
        boardId: task.boardId.toString(),
        columnId: task.columnId,
        userId: task.userId,
        title: task.title,
        description: task.description,
        order: task.order,
      }))
    );
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const task = await getRepository(Task).findOne(taskId);
    if (!task) {
      throw new AppError('Task is not found', StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({
      id: task.id.toString(),
      boardId: task.boardId.toString(),
      columnId: task.columnId,
      userId: task.userId,
      title: task.title,
      description: task.description,
      order: task.order,
    });
  }),

  save: catchAsync(async (req: Request, res: Response) => {
    const paramsBoardId = req.params['boardId'] as string;
    const taskRepo = getRepository(Task);
    const { title, order, description, userId, columnId } = req.body;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.order = order;
    task.userId = userId;
    task.boardId = +paramsBoardId;
    task.columnId = columnId;
    await taskRepo.save(task);
    const addedTask = await taskRepo.findOne(task.id);
    if (!addedTask) {
      throw new AppError(
        'Adding new task failed at some point',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    res.status(StatusCodes.CREATED).json({
      id: addedTask.id.toString(),
      boardId: addedTask.boardId.toString(),
      columnId: addedTask.columnId,
      userId: addedTask.userId,
      title: addedTask.title,
      description: addedTask.description,
      order: addedTask.order,
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    const taskRepo = getRepository(Task);
    const { title, order, description, userId, boardId, columnId } = req.body;
    await taskRepo.update(taskId, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    const updatedTask = await taskRepo.findOne(taskId);
    if (!updatedTask) {
      throw new AppError(
        'Updating a task failed at some point',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    res.status(StatusCodes.OK).json({
      id: updatedTask.id.toString(),
      boardId: updatedTask.boardId.toString(),
      columnId: updatedTask.columnId,
      userId: updatedTask.userId,
      title: updatedTask.title,
      description: updatedTask.description,
      order: updatedTask.order,
    });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params['taskId'] as string;
    await getRepository(Task).delete(taskId);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
