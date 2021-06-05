import Task, { InitialTask } from './task.model';
import * as tasksRepo from './task.memory.repository';

export default {
  getAll: async (boardId: string) => tasksRepo.getAll(boardId),

  get: async (id: string) => tasksRepo.get(id),

  remove: async (id: string) => tasksRepo.remove(id),

  save: async (boardId: string, task: InitialTask) =>
    tasksRepo.save(boardId, new Task(task)),

  update: async (id: string, task: InitialTask) => tasksRepo.update(id, task),
};
