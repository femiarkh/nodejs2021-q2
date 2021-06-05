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
  getAll: () => boardsRepo.getAll(),

  get: (id: string) => boardsRepo.get(id),

  remove: (id: string) => boardsRepo.remove(id),

  save: (board: BoardData) => boardsRepo.save(new Board(board)),

  update: (id: string, board: Board) => boardsRepo.update(id, board),
};
