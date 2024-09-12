import $api from "@config/http.js";

export default class TransportService {
    static async findAll({queryParams}) {
        return $api.get('/transports', {
            params: queryParams,
        });
    }

    static async findById(id) {
        return $api.get(`/transports/${id}`);
    }

    static async getRecentOffers() {
        return $api.get('/transports/recent-offers');
    }
}