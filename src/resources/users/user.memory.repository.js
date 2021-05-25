const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'USERS';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async (id) => DB.get(TABLE_NAME, id);

const save = async (user) => DB.add(TABLE_NAME, user);

const update = async (id, user) => DB.update(TABLE_NAME, id, user);

const remove = async (id) => DB.deleteUser(id);

module.exports = { getAll, save, get, update, remove };
