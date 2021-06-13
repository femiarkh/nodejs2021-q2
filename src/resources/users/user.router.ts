import express from 'express';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(usersService.getAll).post(usersService.save);

router
  .route('/:id')
  .get(usersService.get)
  .put(usersService.update)
  .delete(usersService.remove);

export default router;
