import User from './user.model';
import * as usersRepo from './user.memory.repository';

interface UserData {
  name?: string | undefined;
  login?: string | undefined;
  password?: string | undefined;
}

export default {
  /**
   * Get all users.
   * @returns {Object[]} An array of user objects.
   */
  getAll: () => usersRepo.getAll(),

  /**
   * Get one user.
   * @param {string} id - An id of a user.
   * @returns {Object | string} The found user or '404' in case nothing is found.
   */
  get: (id: string) => usersRepo.get(id),

  /**
   * Delete a user.
   * @param {string} id - An id of a user.
   * @returns {null | string} Null or or '404' in case the user with that id is not found.
   */
  remove: (id: string) => usersRepo.remove(id),

  /**
   * Add a user.
   * @param {Object} user - A user object.
   * @returns {Object} The added user.
   */
  save: (user: UserData) => usersRepo.save(new User(user)),

  /**
   * Update a user.
   * @param {string} id - An id of a user.
   * @param {Object} user - New user data.
   * @returns {Object | string} The updated user or '404' in case the user with that id is not found.
   */
  update: (id: string, user: User) => usersRepo.update(id, user),
};
