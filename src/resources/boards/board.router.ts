import express, { Request, Response } from 'express';
import Board from './board.model';
import boardsService from './board.service';
import * as routerHandlers from '../../utils/routerHandlers';

const router = express.Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetAll(req, res, boardsService, Board);
  })
  .post(async (req: Request, res: Response) => {
    routerHandlers.handlePost(req, res, boardsService, Board);
  });

router
  .route('/:boardId')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetById(
      req,
      res,
      boardsService,
      Board,
      req.params['boardId'] as string
    );
  })
  .put(async (req: Request, res: Response) => {
    routerHandlers.handlePut(
      req,
      res,
      boardsService,
      Board,
      req.params['boardId'] as string
    );
  })
  .delete(async (req: Request, res: Response) => {
    routerHandlers.handleDelete(
      req,
      res,
      boardsService,
      req.params['boardId'] as string
    );
  });

export default router;
