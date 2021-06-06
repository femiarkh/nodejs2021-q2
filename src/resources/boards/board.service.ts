import { Request, Response } from 'express';
import Board, { InitialBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';
import catchAsync from '../../utils/catchAsync';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const boards = (await boardsRepo.getAll()) as Board[];
    res.status(200).json(boards);
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsRepo.get(boardId)) as Board | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  }),

  save: catchAsync(async (req: Request, res: Response) => {
    const newBoardData: InitialBoard = req.body;
    const newBoard = await boardsRepo.save(new Board(newBoardData));
    res.status(201).send(newBoard);
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsRepo.update(boardId, req.body)) as
      | Board
      | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsRepo.remove(boardId)) as Board | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  }),
};
