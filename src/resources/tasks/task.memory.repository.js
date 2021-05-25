const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'TASKS';

const getAll = async (boardId) => DB.getAllTasks(boardId);

const get = async (id) => DB.get(TABLE_NAME, id);

const save = async (boardId, task) => DB.addTask(boardId, task);

const update = async (id, task) => DB.update(TABLE_NAME, id, task);

const remove = async (id) => DB.delete(TABLE_NAME, id);

module.exports = { getAll, save, get, update, remove };
