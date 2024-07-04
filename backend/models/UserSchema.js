import mongoose from "mongoose";
import moment from "moment";
import UserConstants from "./constants/UserConstants.js";

const { Schema } = mongoose;

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

const User = mongoose.model("User", UserSchema);

export default User;
