const User = require('./user.model');
const usersRepo = require('./user.memory.repository');

/**
 * Get all users.
 * @returns {Object[]} An array of user objects.
 */
const getAll = () => usersRepo.getAll();

/**
 * Get one user.
 * @param {string} id - An id of a user.
 * @returns {Object | string} The found user or '404' in case nothing is found.
 */
const get = (id) => usersRepo.get(id);

/**
 * Delete a user.
 * @param {string} id - An id of a user.
 * @returns {null | string} Null or or '404' in case the user with that id is not found.
 */
const remove = (id) => usersRepo.remove(id);

/**
 * Add a user.
 * @param {Object} user - A user object.
 * @returns {Object} The added user.
 */
const save = (user) => usersRepo.save(new User(user));

/**
 * Update a user.
 * @param {string} id - An id of a user.
 * @param {Object} user - New user data.
 * @returns {Object | string} The updated user or '404' in case the user with that id is not found.
 */
const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
