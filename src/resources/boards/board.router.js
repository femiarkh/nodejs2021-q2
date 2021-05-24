const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const routerHandlers = require('../../utils/routerHandlers');

router
  .route('/')
  .get(async (req, res) => {
    routerHandlers.handleGetAll(req, res, boardsService, Board);
  })
  .post(async (req, res) => {
    routerHandlers.handlePost(req, res, boardsService, Board);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    routerHandlers.handleGetById(
      req,
      res,
      boardsService,
      Board,
      req.params.boardId
    );
  })
  .put(async (req, res) => {
    routerHandlers.handlePut(
      req,
      res,
      boardsService,
      Board,
      req.params.boardId
    );
  })
  .delete(async (req, res) => {
    routerHandlers.handleDelete(req, res, boardsService, req.params.boardId);
  });

module.exports = router;
