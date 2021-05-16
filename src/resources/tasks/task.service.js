const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const get = (id) => tasksRepo.get(id);

const remove = (id) => tasksRepo.remove(id);

const save = (boardId, task) => tasksRepo.save(boardId, new Task(task));

const update = (id, board) => tasksRepo.update(id, board);

module.exports = { getAll, get, remove, save, update };
