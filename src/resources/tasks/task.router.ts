import express from 'express';
import tasksService from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(tasksService.getAll).post(tasksService.save);

router
  .route('/:taskId')
  .get(tasksService.get)
  .put(tasksService.update)
  .delete(tasksService.remove);

export default router;
