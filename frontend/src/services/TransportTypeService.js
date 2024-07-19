import $api from "@config/http.js";

export default class TransportTypeService {
    static async findAll() {
        return $api.get('/transport-types');
    }
}