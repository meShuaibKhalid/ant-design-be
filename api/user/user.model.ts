import { Schema, model } from "mongoose";
import { User } from "./user.interface";

const userSchema = new Schema<User>(
  {
    title: { type: String, required: false },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phone: { type: String, required: false },
    role: {
      type: String,
      enum: ["admin", "normal_user"],
      required: true,
      default: "normal_user",
    },
    is_active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", userSchema);
export default UserModel;
