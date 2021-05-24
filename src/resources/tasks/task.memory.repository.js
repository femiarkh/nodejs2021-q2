const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'TASKS';

const getAll = async (boardId) => DB.getAllTasks(TABLE_NAME, boardId);

const get = async (id) => DB.get(TABLE_NAME, id);

const save = async (boardId, task) => DB.addTask(TABLE_NAME, boardId, task);

const update = async (id, user) => DB.update(TABLE_NAME, id, user);

const remove = async (id) => DB.delete(TABLE_NAME, id);

module.exports = { getAll, save, get, update, remove };
