const handleGetAll = async (req, res, service, model, param) => {
  let results;
  if (param) {
    results = await service.getAll(param);
  } else {
    results = await service.getAll();
  }
  res.json(results.map(model.toResponse));
};

const handlePost = async (req, res, service, model, param) => {
  let result;
  if (param) {
    result = await service.save(param, req.body);
  } else {
    result = await service.save(req.body);
  }
  res.status(201).send(model.toResponse(result));
};

const handleGetById = async (req, res, service, model, param) => {
  const result = await service.get(param);
  if (result === '404') {
    res.status(404).send(null);
  } else {
    res.status(200).send(model.toResponse(result));
  }
};

const handlePut = async (req, res, service, model, param) => {
  const result = await service.update(param, req.body);
  res.status(200).send(model.toResponse(result));
};

const handleDelete = async (req, res, service, param) => {
  const result = await service.remove(param);
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
