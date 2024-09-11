import TransportTypeService from "../services/TransportTypeService.js";

const all = async (req, res) => {
    const response = await TransportTypeService.findAll();
    res.status(response.status).json(response.content);
}

const create = async (req, res) => {
    const response = await TransportTypeService.store(req.body);

    res.status(response.status).json(response.content);
}

const remove = async (req, res) => {
    const response = await TransportTypeService.removeById(req.params.id);

    res.status(response.status).json(response.content);
}

const update = async (req, res) => {
    const response = await TransportTypeService.findByIdAndUpdate(req.params.id, req.body);

    res.status(response.status).json(response.content);
}



export default { all, create, remove, update };
