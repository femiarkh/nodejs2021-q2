const { v4 } = require('uuid');

/** Class representing a user. */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Create a user.
   * @param {Object} userObj - An object with user's data.
   * @param {string} userObj.id - User id.
   * @param {string} userObj.name - User name.
   * @param {string} userObj.login - User login.
   * @param {string} userObj.password - User password.
   */
  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Get user's data without password.
   * @param {Object} user - User instance.
   * @returns {Object} User's data stripped of a password.
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
