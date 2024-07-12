import mongoose from "mongoose";
import moment from "moment";
import UserConstants from "./constants/UserConstants.js";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: [UserConstants.ROLE_ADMIN, UserConstants.ROLE_USER],
        default: UserConstants.ROLE_USER,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (created_at) {
            return moment(created_at).format("YYYY-MM-DD HH:mm:ss");
        },
    },
});


export const generateHash = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const hashPassword = async function(next) {
    // Skip this middleware if the password has not been changed
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await generateHash(this.password);

        next();
    } catch (error) {
        next(error);
    }
};

UserSchema.pre("save", hashPassword);
UserSchema.pre("findOneAndUpdate", hashPassword);
UserSchema.pre("updateOne", hashPassword);


const User = mongoose.model("User", UserSchema, "users");

export default User;
