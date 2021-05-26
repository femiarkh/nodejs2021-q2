const uuid = require('uuid');

/** Class representing a board. */
class Task {
  /**
   * Create a task.
   * @param {Object} taskdObj - An object with task's data.
   * @param {string} boardObj.id - Task id.
   * @param {string} boardObj.title - Task title.
   * @param {string} boardObj.order - Order of a task.
   * @param {number} boardObj.description - Description of a task.
   * @param {string} boardObj.userId - Id of a user assigned to the task.
   * @param {string} boardObj.boardId - Board id.
   * @param {string} boardObj.columnId - Column id.
   */
  constructor({
    id = uuid.v4(),
    title = 'TASK',
    order = 0,
    description = 'DESCRIPTION',
    userId = 'USER_ID',
    boardId = 'BOARD_ID',
    columnId = 'COLUMN_ID',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Echoes a task instance.
   * @param {Object} task - A Task instance.
   * @returns A Task instance.
   */
  static toResponse(task) {
    return task;
  }
}

module.exports = Task;
