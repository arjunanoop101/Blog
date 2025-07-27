import jwt from "jsonwebtoken";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";

export const adminLogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    // console.log(token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await blogModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5);
    const blogs = await blogModel.countDocuments();
    const comments = await commentModel.countDocuments();
    const drafts = await blogModel.countDocuments({ isPublished: false });
    const dashBoardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
    return res.status(200).json(dashBoardData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndUpdate(id, { isApproved: true });
    return res.status(200).json({ message: "Comment approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
