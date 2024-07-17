class UserDTO {
    id;
    name;
    email;
    password;
    role;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.email = model.email;
        this.password = model.password;
        this.role = model.role;
    }
}

export default UserDTO;