import Board from './board.model';
import * as boardsRepo from './board.memory.repository';

interface BoardData {
  title?: string | undefined;
  columns?:
    | {
        title: string;
        order: number;
      }[]
    | undefined;
}

export default {
  getAll: async () => boardsRepo.getAll(),

  get: async (id: string) => boardsRepo.get(id),

  remove: async (id: string) => boardsRepo.remove(id),

  save: async (board: BoardData) => boardsRepo.save(new Board(board)),

  update: async (id: string, board: Board) => boardsRepo.update(id, board),
};
