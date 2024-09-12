import PaymentService from "../services/PaymentService.js";

const create = async (req, res) => {
    const response = await PaymentService.store(req.body);
    res.status(response.status).json(response.content);
}

export default { create }