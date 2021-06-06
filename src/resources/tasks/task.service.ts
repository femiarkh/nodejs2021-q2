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
  /**
   * Get all tasks from a board.
   * @param {string} boardId - An id of a board.
   * @returns {Object[]} An array of task objects.
   */
  getAll: (boardId: string) => tasksRepo.getAll(boardId),

  /**
   * Get one task.
   * @param {string} id - An id of a task.
   * @returns {Object | string} The found task or '404' in case nothing is found.
   */
  get: (id: string) => tasksRepo.get(id),

  /**
   * Delete a task.
   * @param {string} id - An id of a task.
   * @returns {null | string} Null or or '404' in case the task with that id is not found.
   */
  remove: (id: string) => tasksRepo.remove(id),

  /**
   * Add a task.
   * @param {string} boardId - An id of a board for the task.
   * @param {Object} task - A task object.
   * @returns {Object} The added task.
   */
  save: (boardId: string, task: TaskData) =>
    tasksRepo.save(boardId, new Task(task)),

  /**
   * Update a task.
   * @param {string} id - An id of a task.
   * @param {Object} task - New task data.
   * @returns {Object | string} The updated task or '404' in case the task with that id is not found.
   */
  update: (id: string, task: Task) => tasksRepo.update(id, task),
};
