const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks from a board.
 * @param {string} boardId - An id of a board.
 * @returns {Object[]} An array of task objects.
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);

/**
 * Get one task.
 * @param {string} id - An id of a task.
 * @returns {Object | string} The found task or '404' in case nothing is found.
 */
const get = (id) => tasksRepo.get(id);

/**
 * Delete a task.
 * @param {string} id - An id of a task.
 * @returns {null | string} Null or or '404' in case the task with that id is not found.
 */
const remove = (id) => tasksRepo.remove(id);

/**
 * Add a task.
 * @param {string} boardId - An id of a board for the task.
 * @param {Object} task - A task object.
 * @returns {Object} The added task.
 */
const save = (boardId, task) => tasksRepo.save(boardId, new Task(task));

/**
 * Update a task.
 * @param {string} id - An id of a task.
 * @param {Object} task - New task data.
 * @returns {Object | string} The updated task or '404' in case the task with that id is not found.
 */
const update = (id, task) => tasksRepo.update(id, task);

module.exports = { getAll, get, remove, save, update };
