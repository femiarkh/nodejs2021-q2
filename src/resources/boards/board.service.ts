import { Request, Response } from 'express';
import Board, { InitialBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';

export default {
  getAll: async (_req: Request, res: Response) => {
    try {
      const boards = (await boardsRepo.getAll()) as Board[];
      res.status(200).json(boards);
    } catch (err) {
      console.log(err);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const boardId = req.params['boardId'] as string;
      const result = (await boardsRepo.get(boardId)) as Board | '404';
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
      const newBoardData: InitialBoard = req.body;
      const newBoard = await boardsRepo.save(new Board(newBoardData));
      res.status(201).send(newBoard);
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const boardId = req.params['boardId'] as string;
      const result = (await boardsRepo.update(boardId, req.body)) as
        | Board
        | '404';
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
      const boardId = req.params['boardId'] as string;
      const result = (await boardsRepo.remove(boardId)) as Board | '404';
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
