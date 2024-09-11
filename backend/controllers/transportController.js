import TransportService from "../services/TransportService.js";

const all = async (req, res) => {
    const response = await TransportService.findAll(req.query);
    res.status(response.status).json(response.content);
}

const findById = async(req, res) => {
    const response = await TransportService.findById(req.params.id);
    res.status(response.status).json(response.content);
}

const create = async (req, res) => {
    const response = await TransportService.store(req.body);
    res.status(response.status).json(response.content);
}

const remove = async (req, res) => {
    const response = await TransportService.removeById(req.params.id);
    res.status(response.status).json(response.content);
}

const update = async (req, res) => {
    const response = await TransportService.findByIdAndUpdate(req.params.id, req.body);
    res.status(response.status).json(response.content);
}

export default { all, create, remove, update, findById }