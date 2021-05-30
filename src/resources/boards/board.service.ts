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
  /**
   * Get all boards.
   * @returns {Object[]} An array of board objects.
   */
  getAll: () => boardsRepo.getAll(),

  /**
   * Get one board.
   * @param {string} id - An id of a board.
   * @returns {Object | string} The found board or '404' in case nothing is found.
   */
  get: (id: string) => boardsRepo.get(id),

  /**
   * Delete a board.
   * @param {string} id - An id of a board.
   * @returns {null | string} Null or or '404' in case the board with that id is not found.
   */
  remove: (id: string) => boardsRepo.remove(id),

  /**
   * Add a board.
   * @param {Object} board - A board object.
   * @returns {Object} The added board.
   */
  save: (board: BoardData) => boardsRepo.save(new Board(board)),

  /**
   * Update a board.
   * @param {string} id - An id of a board.
   * @param {Object} board - New board data.
   * @returns {Object | string} The updated board or '404' in case the board with that id is not found.
   */
  update: (id: string, board: Board) => boardsRepo.update(id, board),
};
