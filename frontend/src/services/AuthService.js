import $api, {API_URL} from "@config/http.js";
import axios from "axios";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/users/login', {email, password});
    }

    static async registration(name, email, password, passwordConfirmation) {
        return $api.post('/users', {name, email, password, passwordConfirmation});
    }

    static async logout() {
        return $api.get('/users/logout');
    }

    static async refresh() {
        return await axios.get(`${API_URL}/users/refresh-tokens`, {withCredentials: true});
    }
}