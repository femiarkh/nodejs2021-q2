const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'BOARDS';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async (id) => DB.get(TABLE_NAME, id);

const save = async (board) => DB.add(TABLE_NAME, board);

const update = async (id, board) => DB.update(TABLE_NAME, id, board);

const remove = async (id) => DB.deleteBoard(id);

module.exports = { getAll, save, get, update, remove };
