import OrderService from "../services/OrderService.js";

const findByClientSecret = async (req, res) => {
    const response = await OrderService.findByClientSecret(req.params.clientSecret);
    res.status(response.status).json(response.content);
}

const create = async (req, res) => {
    const response = await OrderService.store(req.body);
    res.status(response.status).json(response.content);
}

export default { findByClientSecret, create }