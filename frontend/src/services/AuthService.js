import $api, {API_URL} from "@config/http.js";
import axios from "axios";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/users/login', {email, password});
    }

    static async registration(email, password) {
        return $api.post('/registration', {email, password});
    }

    static async logout() {
        return $api.post('/logout');
    }

    static async refresh() {
        return await axios.get(`${API_URL}/refresh`, {withCredentials: true});
    }
}