import DB from '../../utils/inMemoryDB';
import Board from './board.model';

const TABLE_NAME = 'BOARDS';

/**
 * Get all boards from the DB.
 * @async
 * @returns {Object[]} An array of boards.
 */
export const getAll = async () => DB.getAll(TABLE_NAME);

/**
 * Get a board from the DB.
 * @async
 * @param {string} id - An id of a board.
 * @returns {Object | string} The found board or '404' in case nothing is found.
 */
export const get = async (id: string) => DB.get(TABLE_NAME, id);

/**
 * Add a board to the DB.
 * @async
 * @param {Object} board - A board object.
 * @returns {Object} The added board.
 */
export const save = async (board: Board) => DB.add(TABLE_NAME, board);

/**
 * Update a board in the DB.
 * @param {string} id - An id of an updated board.
 * @param {Object} board - New board data.
 * @returns {Object | string} The updated board or '404' in case the board with that id is not found.
 */
export const update = async (id: string, board: Board) =>
  DB.update(TABLE_NAME, id, board);

/**
 * Removes a board from the DB.
 * @async
 * @param {string} id - An id of a board to be deleted.
 * @returns {null | string} Null or or '404' in case the board with that id is not found.
 */
export const remove = async (id: string) => DB.deleteBoard(id);
