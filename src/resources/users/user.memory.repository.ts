import DB from '../../utils/inMemoryDB';
import User, { InitialUser } from './user.model';

const TABLE_NAME = 'USERS';

export const getAll = async () => DB.getAll(TABLE_NAME);

export const get = async (id: string) => DB.get(TABLE_NAME, id);

export const save = async (user: User) => DB.add(TABLE_NAME, user);

export const update = async (id: string, user: InitialUser) =>
  DB.update(TABLE_NAME, id, user);

export const remove = async (id: string) => DB.deleteUser(id);
