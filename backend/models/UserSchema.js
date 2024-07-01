import mongoose from "mongoose";
import moment from "moment";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
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
