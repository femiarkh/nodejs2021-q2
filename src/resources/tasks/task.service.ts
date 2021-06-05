import Task from './task.model';
import * as tasksRepo from './task.memory.repository';

interface TaskData {
  title?: string | undefined;
  order?: number | undefined;
  description?: string | undefined;
  userId?: string | undefined;
  boardId?: string | undefined;
  columnId?: string | undefined;
}

export default {
  getAll: async (boardId: string) => tasksRepo.getAll(boardId),

  get: async (id: string) => tasksRepo.get(id),

  remove: async (id: string) => tasksRepo.remove(id),

  save: async (boardId: string, task: TaskData) =>
    tasksRepo.save(boardId, new Task(task)),

  update: async (id: string, task: Task) => tasksRepo.update(id, task),
};
