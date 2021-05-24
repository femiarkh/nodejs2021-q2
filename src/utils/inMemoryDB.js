module.exports = {
  USERS: [],
  BOARDS: [],
  TASKS: [],

  add(table, entity) {
    this[table] = [...this[table], entity];
    return entity;
  },

  addTask(table, boardId, task) {
    const newTask = { ...task, boardId };
    this[table].push(newTask);
    return newTask;
  },

  getAll(table) {
    return this[table];
  },

  getAllTasks(table, boardId) {
    return this[table].filter((el) => el.boardId === boardId);
  },

  get(table, id) {
    const result = this[table].find((el) => el.id === id);
    if (!result) {
      return '404';
    }
    return result;
  },

  update(table, id, user) {
    const index = this[table].findIndex((it) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table][index] = user;
    return user;
  },

  delete(table, id) {
    const index = this[table].findIndex((it) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table].splice(index, 1);
    return null;
  },

  deleteBoard(table, id) {
    const result = this.delete(table, id);
    if (result === null) {
      this.TASKS = this.TASKS.filter((task) => task.boardId !== id);
    }
    return result;
  },

  deleteUser(table, id) {
    const result = this.delete(table, id);
    if (result === null) {
      this.TASKS.forEach((task, index) => {
        if (task.userId === id) {
          const newTask = { ...task, userId: null };
          this.TASKS[index] = newTask;
        }
      });
    }
    return result;
  },
};
