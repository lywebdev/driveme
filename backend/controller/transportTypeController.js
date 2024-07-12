import {findAll, findByIdAndUpdate, removeById, store} from "../services/transportTypeService.js";

const all = async (req, res) => {
  const responseData = await findAll();

  res.status(responseData.status)
      .json(responseData.content);
};

const create = async (req, res) => {
  const responseData = await store(req.body);

  res.status(responseData.status)
      .json(responseData.content);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const responseData = await removeById(id);

  res.status(responseData.status)
      .json(responseData.content);
};

const update = async (req, res) => {
  const { id } = req.params;
  const responseData = await findByIdAndUpdate(id, req.body);

  res.status(responseData.status)
      .json(responseData.content);
};

export default { all, create, remove, update };
