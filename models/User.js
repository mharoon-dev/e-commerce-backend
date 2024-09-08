import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
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
    },
    refrenceCode: {
      type: String,
      unique: true,
    },
    byRefrence: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refrenceUsers: {
      type: Array,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
