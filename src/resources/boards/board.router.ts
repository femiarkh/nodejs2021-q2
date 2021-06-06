import express from 'express';
import boardsService from './board.service';

const router = express.Router();

router.route('/').get(boardsService.getAll).post(boardsService.save);

router
  .route('/:boardId')
  .get(boardsService.get)
  .put(boardsService.update)
  .delete(boardsService.remove);

export default router;
