import $api from "@config/http.js";

export default class TransportTypeService {
    static async findAll() {
        return $api.get('/transport-types');
    }

    static async deleteById(id) {
        return $api.delete(`/transport-types/${id}`);
    }

    static async create(transportType) {
        return $api.post('/transport-types', transportType);
    }

    static async update(id, transportType) {
        return $api.put(`/transport-types/${id}`, transportType);
    }
}