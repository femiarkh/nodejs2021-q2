import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Board, { InitialBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const boards = (await boardsRepo.getAll()) as Board[];
    res.status(StatusCodes.OK).json(boards);
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsRepo.get(boardId)) as Board;
    res.status(StatusCodes.OK).json(result);
  }),

  save: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, columns }: InitialBoard = req.body;
    if (!title || !columns) {
      return next(
        new AppError(
          'Request body should include the following: title, columns.',
          StatusCodes.BAD_REQUEST
        )
      );
    }
    if (
      !Array.isArray(columns) ||
      columns.some((it) => it.title === undefined || !it.order === undefined)
    ) {
      return next(
        new AppError(
          'Columns provided in the request body must be an array of objects with title and order fields.',
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const newBoardData: InitialBoard = { title, columns };
    const newBoard = await boardsRepo.save(new Board(newBoardData));
    res.status(StatusCodes.CREATED).json(newBoard);
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const updatedBoard = (await boardsRepo.update(boardId, req.body)) as Board;
    res.status(StatusCodes.OK).json(updatedBoard);
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    await boardsRepo.remove(boardId);
    res.status(StatusCodes.NO_CONTENT).send(null);
  }),
};
