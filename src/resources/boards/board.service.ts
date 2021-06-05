import Board, { InitialBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';

export default {
  getAll: async () => boardsRepo.getAll(),

  get: async (id: string) => boardsRepo.get(id),

  remove: async (id: string) => boardsRepo.remove(id),

  save: async (board: InitialBoard) => boardsRepo.save(new Board(board)),

  update: async (id: string, board: InitialBoard) =>
    boardsRepo.update(id, board),
};
