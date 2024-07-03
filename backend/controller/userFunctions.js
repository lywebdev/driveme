import User from "../models/UserSchema.js";

const getAllUsers = (req, res) => {
    User.find()
    .then((users) => {
        console.log(users)
        res.json({message: "success", data: users})
    })
    .catch((err) => {
        console.log(err)
        res
        .status(500)
        .json({message: "error", data: err})
    })
}

const postUser = (req, res) => {
    console.log(req.body)
}

export default {getAllUsers, postUser}