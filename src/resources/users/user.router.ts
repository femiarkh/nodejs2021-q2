import express, { Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';
import * as routerHandlers from '../../utils/routerHandlers';

const router = express.Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetAll(req, res, usersService, User);
  })
  .post(async (req: Request, res: Response) => {
    routerHandlers.handlePost(req, res, usersService, User);
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    routerHandlers.handleGetById(req, res, usersService, User, req.params.id);
  })
  .put(async (req: Request, res: Response) => {
    routerHandlers.handlePut(req, res, usersService, User, req.params.id);
  })
  .delete(async (req: Request, res: Response) => {
    routerHandlers.handleDelete(req, res, usersService, req.params.id);
  });

export default router;
