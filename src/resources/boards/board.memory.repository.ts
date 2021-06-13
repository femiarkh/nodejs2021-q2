import DB from '../../utils/inMemoryDB';
import Board, { InitialBoard } from './board.model';

const TABLE_NAME = 'BOARDS';

export const getAll = async () => DB.getAll(TABLE_NAME);

export const get = async (id: string) => DB.get(TABLE_NAME, id);

export const save = async (board: Board) => DB.add(TABLE_NAME, board);

export const update = async (id: string, board: InitialBoard) =>
  DB.update(TABLE_NAME, id, board);

export const remove = async (id: string) => DB.deleteBoard(id);
