module.exports = {
  USERS: [],
  BOARDS: [],
  TASKS: [],

  /**
   * Puts an entity to one of the DB's arrays.
   * @param {string} table - An array to put an entity to.
   * @param {Object} entity - An entity to be added to the array.
   * @returns {Object} The added entity.
   */
  add(table, entity) {
    this[table] = [...this[table], entity];
    return entity;
  },

  /**
   * Adds a task to a specified board.
   * @param {string} boardId - An id of a board to add a task to.
   * @param {Object} task - A task to be added.
   * @returns {Object} The added task.
   */
  addTask(boardId, task) {
    const newTask = { ...task, boardId };
    this.TASKS.push(newTask);
    return newTask;
  },

  /**
   * Returns a specified array from the DB.
   * @param {string} table - An array to be returned.
   * @returns A specifed array.
   */
  getAll(table) {
    return this[table];
  },

  /**
   * Returns all tasks from a specified board.
   * @param {string} boardId - An id of a board.
   * @returns {Object[]} - An array with all tasks from the board.
   */
  getAllTasks(boardId) {
    return this.TASKS.filter((el) => el.boardId === boardId);
  },

  /**
   * Finds an entity with a spicified id in one of the DB's arrays.
   * @param {string} table - The DB's array to search in.
   * @param {string} id - An id of the entity.
   * @returns {string | Object} The found entity or '404' in case nothing is found.
   */
  get(table, id) {
    const result = this[table].find((el) => el.id === id);
    if (!result) {
      return '404';
    }
    return result;
  },

  /**
   * Swaps an entity in a DB's array for a new one.
   * @param {string} table - An array to work with.
   * @param {string} id - An id of the old entity.
   * @param {Object} entity - The new entity.
   * @returns {string | Object} - The new entity or '404' in case the old entity is not found in the array.
   */
  update(table, id, entity) {
    const index = this[table].findIndex((it) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table][index] = entity;
    return entity;
  },

  /**
   * Removes an entity from DB.
   * @param {string} table - A DB's array to look in.
   * @param {*} id - An id of an enitity to be removed.
   * @returns {null | string} Null or '404' in case the enitity is not found.
   */
  delete(table, id) {
    const index = this[table].findIndex((it) => it.id === id);
    if (index === -1) {
      return '404';
    }
    this[table].splice(index, 1);
    return null;
  },

  /**
   * Deletes a specified board and removes all the tasks associated with it.
   * @param {boardId} - An id of the board to be removed.
   * @returns {null | string} Null or '404' in case the board is not found.
   */
  deleteBoard(boardId) {
    const result = this.delete('BOARDS', boardId);
    if (result === null) {
      this.TASKS = this.TASKS.filter((task) => task.boardId !== boardId);
    }
    return result;
  },

  /**
   * Deletes a specified user and removes his or her id from the tasks he or she was assigned to.
   * @param {string} id - User id.
   * @returns {null | string} Null or '404' in case the user is not found.
   */
  deleteUser(userId) {
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
  },
};
