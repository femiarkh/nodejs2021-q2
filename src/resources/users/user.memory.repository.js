const DB = require('../../utils/inMemoryDB');

const TABLE_NAME = 'USERS';

/**
 * Get all users from the DB.
 * @async
 * @returns {Object[]} An array of users.
 */
const getAll = async () => DB.getAll(TABLE_NAME);

/**
 * Get a user from the DB.
 * @async
 * @param {string} id - An id of a user.
 * @returns {Object | string} The found user or '404' in case the user is not found.
 */
const get = async (id) => DB.get(TABLE_NAME, id);

/**
 * Add a user to the DB.
 * @async
 * @param {Object} user - A user object.
 * @returns {Object} The added user.
 */
const save = async (user) => DB.add(TABLE_NAME, user);

/**
 * Update a user in the DB.
 * @param {string} id - An id of an updated user.
 * @param {Object} user - New user data.
 * @returns {Object | string} Updated user or '404' in case the user with that id is not found.
 */
const update = async (id, user) => DB.update(TABLE_NAME, id, user);

/**
 * Removes a user from the DB.
 * @async
 * @param {string} id - An id of a user to be deleted.
 * @returns {null | string} Null or or '404' in case the user with that id is not found.
 */
const remove = async (id) => DB.deleteUser(id);

module.exports = { getAll, save, get, update, remove };
