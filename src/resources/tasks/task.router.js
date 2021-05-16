const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    // map user fields to exclude secret fields like "password"
    res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const task = await tasksService.save(req.params.boardId, req.body);
    res.status(201).send(Task.toResponse(task));
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const result = await tasksService.get(req.params.taskId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(Task.toResponse(result));
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.status(200).send(Task.toResponse(task));
  })
  .delete(async (req, res) => {
    const result = await tasksService.remove(req.params.taskId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

module.exports = router;
