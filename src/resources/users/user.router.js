const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const routerHandlers = require('../../utils/routerHandlers');

router
  .route('/')
  .get(async (req, res) => {
    routerHandlers.handleGetAll(req, res, usersService, User);
  })
  .post(async (req, res) => {
    routerHandlers.handlePost(req, res, usersService, User);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    routerHandlers.handleGetById(req, res, usersService, User, req.params.id);
  })
  .put(async (req, res) => {
    routerHandlers.handlePut(req, res, usersService, User, req.params.id);
  })
  .delete(async (req, res) => {
    routerHandlers.handleDelete(req, res, usersService, req.params.id);
  });

module.exports = router;
