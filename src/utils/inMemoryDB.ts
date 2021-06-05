import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';

type Table = 'USERS' | 'BOARDS' | 'TASKS';
type Entity = User | Board | Task;

class InMemoryDB {
  private USERS: User[] = [];

  private BOARDS: Board[] = [];

  private TASKS: Task[] = [];

  add<Type extends Entity>(table: Table, entity: Type): Type {
    this[table] = [...this[table], entity] as User[] & Board[] & Task[];
    return entity;
  }

  addTask(boardId: string, task: Task) {
    const newTask = { ...task, boardId };
    this.TASKS.push(newTask);
    return newTask;
  }

  getAll(table: Table) {
    return this[table] as Entity[];
  }

  getAllTasks(boardId: string) {
    return this.TASKS.filter((el) => el.boardId === boardId);
  }

  get(table: Table, id: string) {
    const index = this[table].findIndex((el: Entity) => el.id === id);
    if (index === -1) {
      return '404';
    }
    return this[table][index] as Entity;
  }

  update(table: Table, id: string, entity: User | Board | Task) {
    const index = this[table].findIndex((it: Entity) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table][index] = entity;
    return entity;
  }

  delete(table: Table, id: string) {
    const index = this[table].findIndex((it: Entity) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table].splice(index, 1);
    return null;
  }

  deleteBoard(boardId: string) {
    const result = this.delete('BOARDS', boardId);
    if (result === null) {
      this.TASKS = this.TASKS.filter((task) => task.boardId !== boardId);
    }
    return result;
  }

  deleteUser(userId: string) {
    const result = this.delete('USERS', userId);
    if (result === null) {
      this.TASKS.forEach((task, index) => {
        if (task.userId === userId) {
          const newTask = { ...task, userId: null };
          this.TASKS[index] = newTask;
        }
      });
    }
    return result;
  }
}

export default new InMemoryDB();
