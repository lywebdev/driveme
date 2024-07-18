import TransportTypeService from "../services/transportTypeService.js";

const all = (req, res) => {
    const response = TransportTypeService.findAll();
    res.status(response.status).json(response.content);
}

const create = (req, res) => {
    const response = TransportTypeService.store(req.body);

    res.status(response.status).json(response.content);
}

const remove = (req, res) => {
    const response = TransportTypeService.removeById(req.params.id);

    res.status(response.status).json(response.content);
}

const update = (req, res) => {
    const response = TransportTypeService.findByIdAndUpdate(req.params.id, req.body);

    res.status(response.status).json(response.content);
}



export default { all, create, remove, update };
