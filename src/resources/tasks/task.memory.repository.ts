import DB from '../../utils/inMemoryDB';
import Task from './task.model';

const TABLE_NAME = 'TASKS';

/**
 * Get all tasks from a specified board in the DB.
 * @async
 * @param {string} boardId - An id of a board.
 * @returns {Object[]} An array of tasks.
 */
export const getAll = async (boardId: string) => DB.getAllTasks(boardId);

/**
 * Get a task from the DB.
 * @async
 * @param {string} id - An id of a task.
 * @returns {Object | string} The found task or '404' in case the task is not found.
 */
export const get = async (id: string) => DB.get(TABLE_NAME, id);

/**
 * Add a task with a specified board in the DB.
 * @async
 * @param {string} boardId - An id of a board.
 * @param {Object} task - A task object.
 * @returns {Object} The added task.
 */
export const save = async (boardId: string, task: Task) =>
  DB.addTask(boardId, task);

/**
 * Update a task in the DB.
 * @param {string} id - An id of an updated task.
 * @param {Object} task - New task data.
 * @returns {Object | string} The updated task or '404' in case the task with that id is not found.
 */
export const update = async (id: string, task: Task) =>
  DB.update(TABLE_NAME, id, task);

/**
 * Removes a task from the DB.
 * @async
 * @param {string} id - An id of a task to be deleted.
 * @returns {null | string} Null or '404' in case the task with that id is not found.
 */
export const remove = async (id: string) => DB.delete(TABLE_NAME, id);
