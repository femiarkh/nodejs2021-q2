import { v4 } from 'uuid';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor({
    id = v4(),
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

  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
