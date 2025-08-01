import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/admin.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/comments", auth, getAllComments);
router.get("/blogs", auth, getAllBlogsAdmin);
router.post("/delete-comment", auth, deleteCommentById);
router.post("/approve-comment", auth, approveCommentById);
router.get("/dashboard", auth, getDashboard);

export default router;
