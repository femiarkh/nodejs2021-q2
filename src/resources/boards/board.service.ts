import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/errors/catchAsync';
import AppError from '../../utils/errors/AppError';
import Board from './board.entity';
import Column from '../columns/column.entity';

export default {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const boardRepo = getRepository(Board);
    const boards = await boardRepo.find({ relations: ['columns'] });
    res.status(StatusCodes.OK).json(
      boards.map((board) => ({
        id: board.id.toString(),
        title: board.title,
        columns: board.columns?.map(({ id, title, order }) => ({
          id: id.toString(),
          title,
          order,
        })),
      }))
    );
  }),

  get: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const board = await getRepository(Board).findOne(boardId, {
      relations: ['columns'],
    });
    if (!board) {
      throw new AppError('Board is not found', StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({
      id: board.id.toString(),
      title: board.title,
      columns: board.columns?.map(({ id, title, order }) => ({
        id: id.toString(),
        title,
        order,
      })),
    });
  }),

  save: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, columns } = req.body;
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
    const board = new Board();
    board.title = title;
    await getRepository(Board).save(board);
    const boardColumns = columns.map((column) => {
      column.board_id = board.id;
      return column;
    });
    await Promise.all(
      boardColumns.map(async (column) => getRepository(Column).save(column))
    );
    const addedBoard = await getRepository(Board).findOne(board.id, {
      relations: ['columns'],
    });
    if (!addedBoard) {
      throw new AppError(
        'Adding new board failed at some point',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    res.status(StatusCodes.CREATED).json({
      id: addedBoard.id.toString(),
      title: addedBoard.title,
      columns: addedBoard.columns?.map(({ id, title: columnTitle, order }) => ({
        id: id.toString(),
        title: columnTitle,
        order,
      })),
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    const { title, columns } = req.body;
    const boardRepo = getRepository(Board);
    await boardRepo.update(boardId, { title });
    await Promise.all(
      columns.map(
        async (column: { id: string; title: string; order: number }) =>
          getRepository(Column).update(column.id, {
            title: column.title,
            order: column.order,
          })
      )
    );
    const updatedBoard = await getRepository(Board).findOne(boardId, {
      relations: ['columns'],
    });
    if (!updatedBoard) {
      throw new AppError(
        'Updating a board failed at some point',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    res.status(StatusCodes.OK).json({
      id: updatedBoard.id.toString(),
      title: updatedBoard.title,
      columns: updatedBoard.columns,
    });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const boardId = req.params['boardId'] as string;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Column)
      .where('board_id = :id', { id: boardId })
      .execute();
    res.status(StatusCodes.NO_CONTENT).send(null);
    await getRepository(Board).delete(boardId);
  }),
};
