import $api from "@config/http.js";

export default class TransportLocationService {
    static async findAllCities() {
        return $api.get('/transports/locations/cities');
    }
}