const uuid = require('uuid');

/** Class representing a board. */
class Board {
  /**
   * Create a board.
   * @param {Object} boardObj - An object with board's data.
   * @param {string} boardObj.id - Board id.
   * @param {string} boardObj.title - Board title.
   * @param {Object[]} boardObj.columns - An array of board columns.
   */
  constructor({ id = uuid.v4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Echoes a Board instance.
   * @param {Object} board - A Board instance.
   * @returns {Object} A Board instance.
   */
  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
