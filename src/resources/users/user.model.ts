const { v4 } = require('uuid');

export type InitialUser = {
  name: string;
  login: string;
  password: string;
};

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(userData: InitialUser) {
    const { name, login, password } = userData;
    this.id = v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
