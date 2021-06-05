import User from './user.model';
import * as usersRepo from './user.memory.repository';

interface UserData {
  name?: string | undefined;
  login?: string | undefined;
  password?: string | undefined;
}

export default {
  getAll: async () => usersRepo.getAll(),

  get: async (id: string) => usersRepo.get(id),

  remove: async (id: string) => usersRepo.remove(id),

  save: async (user: UserData) => usersRepo.save(new User(user)),

  update: async (id: string, user: User) => usersRepo.update(id, user),
};
