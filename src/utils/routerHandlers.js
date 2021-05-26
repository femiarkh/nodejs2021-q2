/**
 * Helper function that handles getting all the entities through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} [id] - An id specifying a place to look in.
 */
const handleGetAll = async (req, res, service, model, id) => {
  let results;
  if (id) {
    results = await service.getAll(id);
  } else {
    results = await service.getAll();
  }
  res.json(results.map(model.toResponse));
};

/**
 * Helper function that handles sending new data to the db through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} [id] - An id specifying a place to save data at.
 */
const handlePost = async (req, res, service, model, id) => {
  let result;
  if (id) {
    result = await service.save(id, req.body);
  } else {
    result = await service.save(req.body);
  }
  res.status(201).send(model.toResponse(result));
};

/**
 * Helper function that handles getting an entity by id through a specified service.
 * @param {Object} req - A request.
 * @param {Object} res - A response.
 * @param {Object} service - A service that is used.
 * @param {Object} model - A model class.
 * @param {string} id - An id of the entity.
 */
const handleGetById = async (req, res, service, model, id) => {
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
const handlePut = async (req, res, service, model, id) => {
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
const handleDelete = async (req, res, service, id) => {
  const result = await service.remove(id);
  if (result === '404') {
    res.status(404).send(null);
  } else {
    res.status(204).send(null);
  }
};

module.exports = {
  handleGetAll,
  handlePost,
  handleGetById,
  handlePut,
  handleDelete,
};
