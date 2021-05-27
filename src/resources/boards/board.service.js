const Board = require('./board.model');
const boardsRepo = require('./board.memory.repository');

/**
 * Get all boards.
 * @returns {Object[]} An array of board objects.
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get one board.
 * @param {string} id - An id of a board.
 * @returns {Object | string} The found board or '404' in case nothing is found.
 */
const get = (id) => boardsRepo.get(id);

/**
 * Delete a board.
 * @param {string} id - An id of a board.
 * @returns {null | string} Null or or '404' in case the board with that id is not found.
 */
const remove = (id) => boardsRepo.remove(id);

/**
 * Add a board.
 * @param {Object} board - A board object.
 * @returns {Object} The added board.
 */
const save = (board) => boardsRepo.save(new Board(board));

/**
 * Update a board.
 * @param {string} id - An id of a board.
 * @param {Object} board - New board data.
 * @returns {Object | string} The updated board or '404' in case the board with that id is not found.
 */
const update = (id, board) => boardsRepo.update(id, board);

module.exports = { getAll, get, remove, save, update };
