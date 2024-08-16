import { mongoose, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    name: String,
    avatar: String,
    url: String,
    star: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
