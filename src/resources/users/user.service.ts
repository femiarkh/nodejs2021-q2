import User from './user.model';
import * as usersRepo from './user.memory.repository';

interface UserData {
  name?: string | undefined;
  login?: string | undefined;
  password?: string | undefined;
}

export default {
  getAll: () => usersRepo.getAll(),

  get: (id: string) => usersRepo.get(id),

  remove: (id: string) => usersRepo.remove(id),

  save: (user: UserData) => usersRepo.save(new User(user)),

  update: (id: string, user: User) => usersRepo.update(id, user),
};
