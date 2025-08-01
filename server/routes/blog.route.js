import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blog.controller.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, upload.single("image"), addBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/delete", auth, deleteBlogById);
router.post("/toggle-publish", auth, togglePublish);
router.post("/add-comment", addComment);
router.post("/comments", getBlogComments);

export default router;
