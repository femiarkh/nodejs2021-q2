import { v4 } from 'uuid';

/** Class representing a board. */
class Board {
  id: string;
  title: string;
  columns: {
    title: string;
    order: number;
  }[];

  /**
   * Create a board.
   * @param {Object} boardObj - An object with board's data.
   * @param {string} boardObj.id - Board id.
   * @param {string} boardObj.title - Board title.
   * @param {Object[]} boardObj.columns - An array of board columns.
   */
  constructor({
    id = v4(),
    title = 'BOARD',
    columns = [{ title: '', order: -1 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Echoes a Board instance.
   * @param {Object} board - A Board instance.
   * @returns {Object} A Board instance.
   */
  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
