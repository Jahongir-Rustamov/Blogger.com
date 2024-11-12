import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is requried"],
    },
    password: {
      type: String,
      required: [true, "Password is requried"],
      minlength: [6, "Password must be at least 6 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is requried"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    myBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogModel",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
