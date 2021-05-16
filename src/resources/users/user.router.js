const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.save(req.body);
    res.status(201).send(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const result = await usersService.get(req.params.id);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(User.toResponse(result));
    }
  })
  .put(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const result = await usersService.remove(req.params.id);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

module.exports = router;
