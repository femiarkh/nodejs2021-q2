import DB from '../../utils/inMemoryDB';
import Task from './task.model';

const TABLE_NAME = 'TASKS';

export const getAll = async (boardId: string) => DB.getAllTasks(boardId);

export const get = async (id: string) => DB.get(TABLE_NAME, id);

export const save = async (boardId: string, task: Task) =>
  DB.addTask(boardId, task);

export const update = async (id: string, task: Task) =>
  DB.update(TABLE_NAME, id, task);

export const remove = async (id: string) => DB.delete(TABLE_NAME, id);
