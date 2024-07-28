import $api from "@config/http.js";

export default class TransportService {
    static async findAll({queryParams}) {
        return $api.get('/transports', {
            params: queryParams,
        });
    }
}