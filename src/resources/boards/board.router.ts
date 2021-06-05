import express, { Request, Response } from 'express';
import Board from './board.model';
import boardsService from './board.service';

const router = express.Router();

router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    const boards = (await boardsService.getAll()) as Board[];
    res.status(200).json(boards);
  })
  .post(async (req: Request, res: Response) => {
    const newBoard = await boardsService.save(req.body);
    res.status(201).send(newBoard);
  });

router
  .route('/:boardId')
  .get(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsService.get(boardId)) as Board | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  })
  .put(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsService.update(boardId, req.body)) as
      | Board
      | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(result);
    }
  })
  .delete(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const result = (await boardsService.remove(boardId)) as Board | '404';
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

export default router;
