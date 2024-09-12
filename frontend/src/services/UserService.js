import $api from "@config/http.js";

export default class UserService {
    static async findAll() {
        return $api.get('/admin/users');
    }
}