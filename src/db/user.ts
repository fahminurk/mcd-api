import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullname: { type: String },
  password: { type: String, required: true, select: false },
  isSuperAdmin: { type: Boolean, default: false },
});

export const UserModel = mongoose.model("User", UserSchema);
