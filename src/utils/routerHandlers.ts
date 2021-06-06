import { Request, Response } from 'express';
import boardService from '../resources/boards/board.service';
import userService from '../resources/users/user.service';
import taskService from '../resources/tasks/task.service';
import Board from '../resources/boards/board.model';
import User from '../resources/users/user.model';
import Task from '../resources/tasks/task.model';

type Service = typeof boardService | typeof userService | typeof taskService;
type Entity = User | Board | Task;

interface Model {
  toResponse(entity: Entity): Partial<Entity>;
}

/**
 * Helper function that handles getting all the entities through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} [id] - An id specifying a place to look in.
 */
export async function handleGetAll(
  _req: Request,
  res: Response,
  service: Service,
  model: Model,
  id?: string
) {
  let results;
  if (id) {
    results = await service.getAll(id);
  } else {
    const currentservice = service as typeof boardService | typeof userService;
    results = await currentservice.getAll();
  }
  res.json(results.map(model.toResponse));
}

/**
 * Helper function that handles sending new data to the db through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} [id] - An id specifying a place to save data at.
 */
export async function handlePost(
  req: Request,
  res: Response,
  service: Service,
  model: Model,
  id?: string
) {
  let result;
  let currentservice;
  if (id) {
    currentservice = service as typeof taskService;
    result = await currentservice.save(id, req.body);
  } else {
    currentservice = service as typeof boardService | typeof userService;
    result = await currentservice.save(req.body);
  }
  res.status(201).send(model.toResponse(result));
}

/**
 * Helper function that handles getting an entity by id through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} id - An id of the entity.
 */
export const handleGetById = async (
  _req: Request,
  res: Response,
  service: Service,
  model: Model,
  id: string
) => {
  const result = await service.get(id);
  if (result === '404') {
    res.status(404).send(null);
  } else {
    res.status(200).send(model.toResponse(result));
  }
};

/**
 * Helper function that handles updating an entity through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} id - An id of the entity updated.
 */
export const handlePut = async (
  req: Request,
  res: Response,
  service: Service,
  model: Model,
  id: string
) => {
  const result = await service.update(id, req.body);
  if (result === '404') {
    res.status(404).send(null);
  } else {
    res.status(200).send(model.toResponse(result));
  }
};

/**
 * Helper function that handles deleting an entity through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {string} id - An id of the entity deleted.
 */
export const handleDelete = async (
  _req: Request,
  res: Response,
  service: Service,
  id: string
) => {
  const result = await service.remove(id);
  if (result === '404') {
    res.status(404).send(null);
  } else {
    res.status(204).send(null);
  }
};
