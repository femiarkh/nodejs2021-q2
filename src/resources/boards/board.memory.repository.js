const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'BOARDS';

/**
 * Get all boards from the DB.
 * @async
 * @returns {Object[]} An array of boards.
 */
const getAll = async () => DB.getAll(TABLE_NAME);

/**
 * Get a board from the DB.
 * @async
 * @param {string} id - An id of a board.
 * @returns {Object | string} The found board or '404' in case nothing is found.
 */
const get = async (id) => DB.get(TABLE_NAME, id);

/**
 * Add a board to the DB.
 * @async
 * @param {Object} board - A board object.
 * @returns {Object} The added board.
 */
const save = async (board) => DB.add(TABLE_NAME, board);

/**
 * Update a board in the DB.
 * @param {string} id - An id of an updated board.
 * @param {Object} board - New board data.
 * @returns {Object | string} The updated board or '404' in case the board with that id is not found.
 */
const update = async (id, board) => DB.update(TABLE_NAME, id, board);

/**
 * Removes a board from the DB.
 * @async
 * @param {string} id - An id of a board to be deleted.
 * @returns {null | string} Null or or '404' in case the board with that id is not found.
 */
const remove = async (id) => DB.deleteBoard(id);

module.exports = { getAll, save, get, update, remove };
