import SlotService from "../services/SlotService.js";

const create = async (req, res) => {
    const response = await SlotService.store(req.body);
    res.status(response.status).json(response.content);
}



export default { create }