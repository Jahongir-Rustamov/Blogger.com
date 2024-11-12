import mongoose from "mongoose";

const blogschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blogModel", blogschema);

export default blogModel;
