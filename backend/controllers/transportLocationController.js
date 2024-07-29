import TransportLocationSerivce from "../services/transportLocationSerivce.js";

const allCities = async (req, res) => {
    const response = await TransportLocationSerivce.findAllCities(req.query);
    res.status(response.status).json(response.content);
}


export default { allCities }