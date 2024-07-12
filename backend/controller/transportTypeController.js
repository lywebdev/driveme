import {findAll, findByIdAndUpdate, removeById, store} from "../services/transportTypeService.js";
import {handleRequest} from "../services/baseService.js";

const all = (req, res) => handleRequest(req, res, findAll);

const create = (req, res) => handleRequest(req, res, store, req.body);

const remove = (req, res) => handleRequest(req, res, removeById, req.params.id);

const update = (req, res) => handleRequest(req, res, findByIdAndUpdate, req.params.id, req.body);



export default { all, create, remove, update };
