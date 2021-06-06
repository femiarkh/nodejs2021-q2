import { StatusCodes } from 'http-status-codes';
import User, { InitialUser } from '../resources/users/user.model';
import Board, { InitialBoard } from '../resources/boards/board.model';
import Task, { InitialTask } from '../resources/tasks/task.model';
import AppError from './errors/AppError';

type Table = 'USERS' | 'BOARDS' | 'TASKS';
type Entity = User | Board | Task;
type InitialEntity = InitialUser | InitialBoard | InitialTask;

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
      throw new AppError('entity is not found', StatusCodes.NOT_FOUND);
    }
    return this[table][index] as Entity;
  }

  update(table: Table, id: string, entity: InitialEntity) {
    const index = this[table].findIndex((it: Entity) => it.id === id);
    if (index === -1) {
      throw new AppError('entity is not found', StatusCodes.NOT_FOUND);
    }
    this[table][index] = { id, ...entity };
    return entity;
  }

  delete(table: Table, id: string) {
    const index = this[table].findIndex((it: Entity) => it.id === id);
    if (index === -1) {
      throw new AppError('entity is not found', StatusCodes.NOT_FOUND);
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
