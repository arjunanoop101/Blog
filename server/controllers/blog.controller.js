import fs from "fs";
import imagekit from "../config/imageKit.js";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";

export const addBlog = async (req, res) => {
  try {
    // console.log("req.body", req.body.blog);
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file; //should create middleware for file upload

    // console.log("imageFile", imageFile);
    // console.log(title, subTitle, description, category, isPublished, imageFile);
    //check if all fields are present
    if (!title || !subTitle || !description || !category || !imageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to imagekit.io
    const fileBuffer = fs.readFileSync(imageFile.path); //convert image to buffer
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    //optimization of image using imagekit
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // autocompress
        { format: "webp" }, //convert to modern format
        { width: "1280" }, //resize
      ],
    });

    const image = optimizedImageUrl;
    const newBlog = new blogModel({
      title,
      subtitle: subTitle,
      description,
      category,
      image,
      isPublished,
    });
    await newBlog.save();

    return res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    return res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await blogModel.findByIdAndDelete(id);

    //delete all comments associated with the blog
    await commentModel.deleteMany({ blog: id });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await blogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    // console.log("reached here");
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await commentModel.create({ blog, name, content });
    // console.log("comment in backend", req.body);
    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await commentModel
      .find({ blog: blogId, isApproved: true })
      .sort({ createdAt: -1 });
    // console.log("comments from backend", comments);
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
