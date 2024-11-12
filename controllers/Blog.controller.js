import blogModel from "../models/blogs.js";
import UserModel from "../models/user.js";
export async function CreateBlog(req, res) {
  try {
    const { title, imageFile, imageUrl, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields required ⚠️" });
    }
    if (!imageFile && !imageUrl) {
      return res.status(400).json({ message: "Select a image File or Url ⚠️" });
    }
    const newBlog = await blogModel.create({
      content,
      title,
      image: imageFile || imageUrl,
    });

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        myBlogs: newBlog._id,
      },
    });

    res.status(200).json(newBlog);
  } catch (error) {
    console.log("Error in CreateBlog Controller:", error.message);
    res.status(500).json({
      message: "Error in CreateBlog Controller:",
      error: error.message,
    });
  }
}

export async function GetAllBlogs(req, res) {
  try {
    const allBlogs = await blogModel.find({});
    const shuffledBlogs = allBlogs.sort(() => Math.random() - 0.5);
    res.status(200).json({ data: shuffledBlogs });
  } catch (error) {
    console.log("Error in GetAllBlogs controller:", error.message);
    res.status(500).json({
      message: "Error in GetAllBlogs controller",
      error: error.message,
    });
  }
}

export async function GetMyBlogs(req, res) {
  try {
    const user = req.user;
    const myblog = await UserModel.findById(user._id).populate("myBlogs");
    const sortBlogs = myblog.myBlogs.reverse();
    res.status(200).json({ data: sortBlogs });
  } catch (error) {
    console.log("Error in GetMyBlogs controller:", error.message);
    res.status(500).json({
      message: "Error in GetMyBlogs controller",
      error: error.message,
    });
  }
}

export async function UpdateAllData(req, res) {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    if (!title || !image || !content) {
      return res.status(400).json({ message: "All fields required ⚠️" });
    }
    const updateBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
        image: image,
      },
      {
        new: true,
      }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found ❎" });
    }
    res.status(200).json({ data: updateBlog });
  } catch (error) {
    console.log("Error in UpdateAllData controller:", error.message);
    res.status(500).json({
      message: "Error in UpdateAllData controller",
      error: error.message,
    });
  }
}

export async function DeleteBlog(req, res) {
  try {
    const user = await UserModel.findById(req.user._id);
    user.myBlogs = user.myBlogs.filter(
      (blogId) => blogId.toString() !== req.params.id
    );
    await user.save();
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: blog });
  } catch (error) {
    console.log("Error in DeleteBlog controller:", error.message);
    res.status(500).json({
      message: "Error in DeleteBlog controller",
      error: error.message,
    });
  }
}

export async function ReadMore(req, res) {
  try {
    const ReadInfos = await blogModel.findById(req.params.id);
    if (!ReadInfos) {
      return res.status(404).json({ message: "Blog not found" });
    }
    console.log(ReadInfos);
    res.status(200).json({ data: ReadInfos });
  } catch (error) {
    console.log("Error in ReadMore controller:", error.message);
    res.status(500).json({
      message: "Error in ReadMore controller",
      error: error.message,
    });
  }
}
