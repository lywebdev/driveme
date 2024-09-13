import OrderService from "../services/OrderService.js";


const findAll = async (req, res) => {
    const response = await OrderService.findAll();
    res.status(response.status).json(response.content);
}

const findByClientSecret = async (req, res) => {
    const response = await OrderService.findByClientSecret(req.params.clientSecret);
    res.status(response.status).json(response.content);
}

const create = async (req, res) => {
    const response = await OrderService.store(req.body);
    res.status(response.status).json(response.content);
}

export default { findAll, findByClientSecret, create }