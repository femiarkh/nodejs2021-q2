const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.save(req.body);
    res.status(201).send(Board.toResponse(board));
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const result = await boardsService.get(req.params.boardId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(200).send(Board.toResponse(result));
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.status(200).send(Board.toResponse(board));
  })
  .delete(async (req, res) => {
    const result = await boardsService.remove(req.params.boardId);
    if (result === '404') {
      res.status(404).send(null);
    } else {
      res.status(204).send(null);
    }
  });

module.exports = router;
