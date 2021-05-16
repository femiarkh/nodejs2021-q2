const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const routerHandlers = require('../../utils/routerHandlers');

router
  .route('/')
  .get(async (req, res) => {
    routerHandlers.handleGetAll(
      req,
      res,
      tasksService,
      Task,
      req.params.boardId
    );
  })
  .post(async (req, res) => {
    routerHandlers.handlePost(req, res, tasksService, Task, req.params.boardId);
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    routerHandlers.handleGetById(
      req,
      res,
      tasksService,
      Task,
      req.params.taskId
    );
  })
  .put(async (req, res) => {
    routerHandlers.handlePut(req, res, tasksService, Task, req.params.taskId);
  })
  .delete(async (req, res) => {
    routerHandlers.handleDelete(req, res, tasksService, req.params.taskId);
  });

module.exports = router;
